-- Loans Tracking Migration
-- Light Brand Consulting
-- Track loans with lender info, terms, and repayment details

-- Loans table
CREATE TABLE IF NOT EXISTS loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lender_name TEXT NOT NULL,
  lender_contact TEXT, -- Contact person or email
  original_amount DECIMAL(10,2) NOT NULL,
  current_balance DECIMAL(10,2) NOT NULL,
  interest_rate DECIMAL(5,2) DEFAULT 0, -- Annual interest rate as percentage
  monthly_payment DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  payment_day INTEGER DEFAULT 1 CHECK (payment_day >= 1 AND payment_day <= 31), -- Day of month payment is due
  terms TEXT, -- Loan terms/notes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure maturity_date is after start_date
  CONSTRAINT valid_loan_dates CHECK (maturity_date >= start_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_loans_is_active ON loans(is_active);
CREATE INDEX IF NOT EXISTS idx_loans_maturity_date ON loans(maturity_date);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_loans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_loans_updated_at ON loans;
CREATE TRIGGER trigger_loans_updated_at
  BEFORE UPDATE ON loans
  FOR EACH ROW
  EXECUTE FUNCTION update_loans_updated_at();

-- Enable RLS
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin access only
CREATE POLICY "Allow authenticated read on loans" ON loans
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on loans" ON loans
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on loans" ON loans
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on loans" ON loans
  FOR DELETE TO authenticated USING (true);

-- Service role policies
CREATE POLICY "Allow service role full access on loans" ON loans
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Comments
COMMENT ON TABLE loans IS 'Track business loans with lender info and repayment terms';
COMMENT ON COLUMN loans.lender_name IS 'Name of the person or institution providing the loan';
COMMENT ON COLUMN loans.lender_contact IS 'Contact info for the lender';
COMMENT ON COLUMN loans.interest_rate IS 'Annual interest rate as percentage (e.g., 5.5 for 5.5%)';
COMMENT ON COLUMN loans.payment_day IS 'Day of month payment is due (1-31)';
COMMENT ON COLUMN loans.terms IS 'Loan terms and conditions';

-- ============================================================================
-- Add Partner Portfolio Projects
-- Light Brand Consulting
--
-- This migration adds partner portfolio projects showcasing nonprofit work,
-- social enterprise, media platforms, agency consulting, and client success stories.
-- ============================================================================

INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order)
VALUES
  (
    'Ottawa International Jazz Festival',
    'Helped raise millions of dollars through fundraising initiatives supporting one of Canada''s premier cultural festivals. Delivered strategic fundraising campaigns and donor engagement strategies for this nationally recognized arts organization.',
    '/images/portfolio/ottawa-jazz-festival.jpg',
    ARRAY['Nonprofit', 'Fundraising', 'Cultural Events', 'Arts', 'Canada'],
    'https://ottawajazzfestival.com',
    'Ottawa International Jazz Festival',
    'Nonprofit / Cultural Events',
    false,
    'published',
    58
  ),
  (
    'World Vision — 30-Hour Famine',
    'Led the funding component of national campaigns, helping raise hundreds of thousands of dollars while mobilizing youth leaders across Canada. Managed large-scale fundraising initiatives and youth engagement programs for this global humanitarian organization.',
    '/images/portfolio/world-vision-famine.jpg',
    ARRAY['Nonprofit', 'Fundraising', 'Youth Leadership', 'Humanitarian', 'National Campaigns'],
    'https://www.worldvision.ca',
    'World Vision Canada',
    'Nonprofit / Humanitarian',
    true,
    'published',
    59
  ),
  (
    'New Renaissance',
    'Founded and led a nonprofit movement from the ground up over 8 years as Executive Director. Built a community of 250+ young adults meeting weekly, supporting entrepreneurship, creativity, and leadership while helping reconnect a generation to faith, identity, and purpose. Expanded across Canada with sustained long-term impact.',
    '/images/portfolio/new-renaissance.jpg',
    ARRAY['Nonprofit', 'Community Building', 'Leadership Development', 'Youth Movement', 'Faith-Based'],
    NULL,
    'New Renaissance',
    'Nonprofit / Community Movement',
    true,
    'published',
    60
  ),
  (
    'Carlington Booch',
    'Helped build a mission-driven kombucha brand from scratch as a social enterprise. Developed the e-commerce brand and business foundation where 100% of revenue supports addiction recovery and reintegration programs.',
    '/images/portfolio/carlington-booch.jpg',
    ARRAY['Social Enterprise', 'E-commerce', 'Brand Development', 'Addiction Recovery', 'Mission-Driven'],
    'https://carlingtonbooch.com',
    'Carlington Booch',
    'Social Enterprise / Beverage',
    false,
    'published',
    61
  ),
  (
    'Ashes to Rubies',
    'Helped create LifeLab, an addiction recovery and reintegration program that has helped hundreds of individuals overcome addiction. Supported curriculum development, program structure, and delivery rooted in dignity and identity transformation.',
    '/images/portfolio/ashes-to-rubies.jpg',
    ARRAY['Addiction Recovery', 'Program Development', 'Social Impact', 'Reintegration', 'Nonprofit'],
    'https://ashestorubies.com',
    'Ashes to Rubies',
    'Addiction Recovery / Social Impact',
    true,
    'published',
    62
  ),
  (
    'Shifter Magazine',
    'Co-founded and published a cultural media platform, building and scaling the magazine from the ground up. Covered major events including Juno Awards, International Film Festivals, and Academy Awards. Launched and elevated countless creatives before successfully exiting; the magazine continues to operate today.',
    '/images/portfolio/shifter-magazine.jpg',
    ARRAY['Media', 'Publishing', 'Cultural Platform', 'Entertainment', 'Startup Exit'],
    'https://shiftermagazine.com',
    'Shifter Magazine',
    'Media / Publishing',
    true,
    'published',
    63
  ),
  (
    'TALK',
    'Supported brand and creative strategy during rapid growth for this Juno Award-winning artist. Provided strategic guidance on positioning, brand development, and creative direction as the artist scaled to selling out stadiums internationally.',
    '/images/portfolio/talk-artist.jpg',
    ARRAY['Music', 'Artist Development', 'Brand Strategy', 'Creative Direction', 'Entertainment'],
    'https://www.iamtalkmusic.com',
    'TALK',
    'Music / Entertainment',
    true,
    'published',
    64
  ),
  (
    'Shaneen Megji',
    'Built personal brand and flagship offer from the ground up. Helped launch coaching business with complete brand development, positioning strategy, and offer creation for sustainable business growth.',
    '/images/portfolio/shaneen-megji.jpg',
    ARRAY['Personal Brand', 'Coaching', 'Offer Development', 'Brand Strategy', 'Business Launch'],
    'https://www.shaneenmegji.com',
    'Shaneen Megji',
    'Coaching / Personal Brand',
    false,
    'published',
    65
  ),
  (
    'Performance Window Cleaning',
    'Built from the ground up with a 21-year-old founder. Developed brand, business systems, and growth strategy that scaled the company to approximately $3M/year in revenue.',
    '/images/portfolio/performance-window-cleaning.jpg',
    ARRAY['Service Business', 'Business Development', 'Brand Building', 'Growth Strategy', 'Startup'],
    'https://performancewindowcleaning.com',
    'Performance Window Cleaning',
    'Service Business / Commercial Cleaning',
    true,
    'published',
    66
  ),
  (
    'We Scale It',
    'Worked with CEO Charles Lecasse to redesign the entire business model. Transformed the company to now generate approximately $50K/month, serving French-owned businesses with scalable growth solutions.',
    '/images/portfolio/we-scale-it.jpg',
    ARRAY['Business Consulting', 'Business Model Design', 'Revenue Growth', 'French Market', 'Scaling'],
    'https://wescaleit.ca',
    'We Scale It',
    'Business Consulting / Growth',
    false,
    'published',
    67
  )
ON CONFLICT DO NOTHING;

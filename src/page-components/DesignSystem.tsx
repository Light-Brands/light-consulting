/**
 * Design System Showcase Page
 * Light Brand Consulting
 * 
 * Component library showcase for development reference
 */

import React, { useState } from 'react';
import { tokens } from '@/design-system';
import {
  Container,
  Section,
  Grid,
  Stack,
  Divider,
  Heading,
  Text,
  Label,
  DisplayText,
  Code,
  Blockquote,
  Button,
  IconButton,
  ButtonGroup,
  Input,
  Textarea,
  Select,
  Card,
  Badge,
  DotBadge,
  NumberBadge,
  Alert,
  Modal,
  ConfirmDialog,
} from '../components/ui';

export const DesignSystemPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div className="min-h-screen bg-depth-base">
      {/* Hero */}
      <Section spacing="lg" background="elevated">
        <Container size="wide">
          <DisplayText size="md" gradient className="mb-6">
            Design System
          </DisplayText>
          <Text variant="lead" className="max-w-3xl">
            Component library built with design tokens for consistency, accessibility, and
            developer experience.
          </Text>
        </Container>
      </Section>

      {/* Color Palette */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Color Palette
          </Heading>

          <Grid cols={3} gap={8}>
            {/* Radiance Scale */}
            <Stack spacing={4}>
              <Heading level="h4" className="mb-4">
                Radiance (Primary)
              </Heading>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-radiance-gold">
                  <Text className="text-depth-base font-semibold">Gold</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.radiance.gold}
                  </Code>
                </div>
                <div className="p-4 rounded-lg bg-radiance-amber">
                  <Text className="text-depth-base font-semibold">Amber</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.radiance.amber}
                  </Code>
                </div>
                <div className="p-4 rounded-lg bg-radiance-warm">
                  <Text className="text-depth-base font-semibold">Warm</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.radiance.warm}
                  </Code>
                </div>
              </div>
            </Stack>

            {/* Clarity Scale */}
            <Stack spacing={4}>
              <Heading level="h4" className="mb-4">
                Clarity (Secondary)
              </Heading>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-clarity-cream border border-depth-border">
                  <Text className="text-depth-base font-semibold">Cream</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.clarity.cream}
                  </Code>
                </div>
                <div className="p-4 rounded-lg bg-clarity-soft border border-depth-border">
                  <Text className="text-depth-base font-semibold">Soft</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.clarity.soft}
                  </Code>
                </div>
                <div className="p-4 rounded-lg bg-clarity-muted">
                  <Text className="text-depth-base font-semibold">Muted</Text>
                  <Code inline className="mt-1">
                    {tokens.colors.clarity.muted}
                  </Code>
                </div>
              </div>
            </Stack>

            {/* Semantic Colors */}
            <Stack spacing={4}>
              <Heading level="h4" className="mb-4">
                Semantic Colors
              </Heading>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-success">
                  <Text className="text-text-primary font-semibold">Success</Text>
                </div>
                <div className="p-4 rounded-lg bg-warning">
                  <Text className="text-depth-base font-semibold">Warning</Text>
                </div>
                <div className="p-4 rounded-lg bg-error">
                  <Text className="text-text-primary font-semibold">Error</Text>
                </div>
                <div className="p-4 rounded-lg bg-info">
                  <Text className="text-depth-base font-semibold">Info</Text>
                </div>
              </div>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Typography */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Typography
          </Heading>

          <Stack spacing={6}>
            <div>
              <Heading level="h1">Heading 1</Heading>
              <Code inline>{'<Heading level="h1">'}</Code>
            </div>
            <div>
              <Heading level="h2">Heading 2</Heading>
              <Code inline>{'<Heading level="h2">'}</Code>
            </div>
            <div>
              <Heading level="h3">Heading 3</Heading>
              <Code inline>{'<Heading level="h3">'}</Code>
            </div>
            <div>
              <Text variant="lead">
                Lead text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Code inline>{'<Text variant="lead">'}</Code>
            </div>
            <div>
              <Text variant="body">
                Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Code inline>{'<Text variant="body">'}</Code>
            </div>
            <div>
              <Text variant="small">
                Small text - Lorem ipsum dolor sit amet.
              </Text>
              <Code inline>{'<Text variant="small">'}</Code>
            </div>
            <div>
              <Text variant="muted">
                Muted text - Lorem ipsum dolor sit amet.
              </Text>
              <Code inline>{'<Text variant="muted">'}</Code>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Buttons */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Buttons
          </Heading>

          <Stack spacing={8}>
            {/* Variants */}
            <div>
              <Heading level="h4" className="mb-4">
                Variants
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Heading level="h4" className="mb-4">
                Sizes
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* States */}
            <div>
              <Heading level="h4" className="mb-4">
                States
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                >
                  With Icon
                </Button>
              </div>
            </div>

            {/* Button Group */}
            <div>
              <Heading level="h4" className="mb-4">
                Button Group
              </Heading>
              <ButtonGroup attached>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Form Inputs */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Form Inputs
          </Heading>

          <Grid cols={2} gap={8}>
            <Stack spacing={6}>
              <Input label="Email Address" type="email" placeholder="you@example.com" required />
              <Input
                label="With Error"
                error="This field is required"
                placeholder="Enter value"
              />
              <Input
                label="With Hint"
                hint="We'll never share your email"
                placeholder="Enter email"
              />
              <Select
                label="Select Option"
                options={[
                  { value: '', label: 'Choose one...' },
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                ]}
              />
            </Stack>

            <Stack spacing={6}>
              <Textarea label="Message" placeholder="Enter your message..." rows={5} />
              <Input
                label="With Icon"
                placeholder="Search..."
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Cards */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Cards
          </Heading>

          <Grid cols={3} gap={6}>
            <Card elevation="subtle">
              <Card.Header divider>
                <Heading level="h4">Card Title</Heading>
              </Card.Header>
              <Card.Body>
                <Text>Card content goes here with some description text.</Text>
              </Card.Body>
              <Card.Footer divider>
                <Button size="sm">Action</Button>
              </Card.Footer>
            </Card>

            <Card elevation="elevated" hoverable>
              <Heading level="h4" className="mb-3">
                Elevated Card
              </Heading>
              <Text>Hoverable card with elevated shadow.</Text>
            </Card>

            <Card elevation="floating">
              <Heading level="h4" className="mb-3">
                Floating Card
              </Heading>
              <Text>Card with floating shadow effect.</Text>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Badges */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Badges
          </Heading>

          <Stack spacing={6}>
            <div>
              <Heading level="h4" className="mb-4">
                Variants
              </Heading>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="premium">Premium</Badge>
                <Badge variant="wisdom">Wisdom</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div>
              <Heading level="h4" className="mb-4">
                Sizes
              </Heading>
              <div className="flex flex-wrap items-center gap-3">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>

            <div>
              <Heading level="h4" className="mb-4">
                Dot Badges
              </Heading>
              <div className="flex flex-wrap gap-3">
                <DotBadge variant="success">Online</DotBadge>
                <DotBadge variant="error">Offline</DotBadge>
                <DotBadge variant="warning">Away</DotBadge>
              </div>
            </div>

            <div>
              <Heading level="h4" className="mb-4">
                Number Badges
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <NumberBadge count={5} variant="default" />
                <NumberBadge count={12} variant="premium" />
                <NumberBadge count={150} max={99} variant="error" />
              </div>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Alerts */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Alerts
          </Heading>

          <Stack spacing={4}>
            <Alert variant="info" title="Information" dismissible>
              This is an informational alert message.
            </Alert>
            <Alert variant="success" title="Success!" dismissible>
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning" dismissible>
              Please review your settings before continuing.
            </Alert>
            <Alert variant="error" title="Error" dismissible>
              An error occurred while processing your request.
            </Alert>
            <Alert variant="default" dismissible>
              Default alert without a title.
            </Alert>
          </Stack>
        </Container>
      </Section>

      <Divider spacing={8} />

      {/* Modals */}
      <Section spacing="lg">
        <Container size="wide">
          <Heading level="h2" className="mb-8">
            Modals
          </Heading>

          <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Button onClick={() => setIsConfirmOpen(true)} variant="danger">
              Open Confirm Dialog
            </Button>
          </div>

          {/* Regular Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <Text className="mb-4">
              This is a modal dialog component with proper accessibility features including focus
              trapping and keyboard navigation.
            </Text>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>

          {/* Confirm Dialog */}
          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              alert('Confirmed!');
              setIsConfirmOpen(false);
            }}
            title="Confirm Action"
            message="Are you sure you want to proceed with this action? This cannot be undone."
            confirmText="Yes, proceed"
            cancelText="Cancel"
            confirmVariant="danger"
          />
        </Container>
      </Section>

      {/* Footer Info */}
      <Section spacing="md" background="elevated">
        <Container size="wide">
          <Text variant="small" align="center" className="text-text-muted">
            Design System v1.0.0 • Built with design tokens • {Object.keys(tokens.colors).length}{' '}
            color scales • Type-safe components
          </Text>
        </Container>
      </Section>
    </div>
  );
};

export default DesignSystemPage;

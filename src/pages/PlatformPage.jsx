import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  ArrowRight,
  BarChart3,
  Code2,
  GraduationCap,
  MessageCircle,
  Play,
  SlidersHorizontal,
  Users,
  Zap,
} from 'lucide-react';

const cream = '#EEF4CC';
const creamSoft = '#F7F9E4';
const forest = '#004225';
const forestDark = '#04301f';
const orange = '#F56431';
const lime = '#8DC63F';
const lavender = '#E8DCEA';

const pillars = [
  {
    id: 'feat-1',
    icon: MessageCircle,
    color: lime,
    iconColor: forestDark,
    title: 'AI Roleplays',
    copy: 'Custom scenarios & adaptive personas',
  },
  {
    id: 'feat-2',
    icon: Zap,
    color: orange,
    iconColor: '#fff',
    title: 'Instant Feedback',
    copy: 'Scoring & AI coaching every session',
  },
  {
    id: 'feat-3',
    icon: GraduationCap,
    color: lavender,
    iconColor: '#5a3a6a',
    title: 'Learning Journeys',
    copy: 'Guided paths & content library',
  },
  {
    id: 'feat-4',
    icon: SlidersHorizontal,
    color: '#cfe4f5',
    iconColor: '#2c6ea0',
    title: 'Customization',
    copy: 'Scenario & persona builder, no code',
  },
  {
    id: 'feat-5',
    icon: Users,
    color: '#f6c85f',
    iconColor: '#7a5a10',
    title: 'Team & Admin',
    copy: 'Seats, cohorts & manager views',
  },
  {
    id: 'feat-6',
    icon: BarChart3,
    color: lime,
    iconColor: forestDark,
    title: 'Analytics',
    copy: 'Skill gaps tied to business KPIs',
  },
  {
    id: 'feat-7',
    icon: Code2,
    color: forest,
    iconColor: cream,
    title: 'API Integration',
    copy: 'Drop Speekr into your LMS',
  },
];

const features = [
  {
    id: 'feat-1',
    number: '01',
    eyebrow: 'AI ROLEPLAYS',
    title: 'Realistic roleplays that adapt like real people',
    copy:
      'Employees practice the conversations that matter most — with AI personas that respond naturally, push back, and adapt to every turn in real time.',
    dark: true,
    visual: 'roleplay',
    bullets: [
      ['Custom scenarios', 'Build sales, care, leadership, onboarding & technical roleplays for any team.'],
      ['Adaptive AI personas', 'Names, voices, and 15+ Arabic dialects that feel like real customers.'],
      ['Objection handling', 'Personas escalate and object exactly like the real thing.'],
    ],
  },
  {
    id: 'feat-2',
    number: '02',
    eyebrow: 'INSTANT FEEDBACK & COACHING',
    title: 'Coaching after every conversation, not once a quarter',
    copy:
      'Every roleplay is scored the moment it ends, with specific, actionable feedback employees can act on immediately.',
    visual: 'feedback',
    bullets: [
      ['Scoring', 'Scoring across clarity, empathy, questioning, tone & word choice'],
      ['Personalised AI coaching notes', 'Concrete next steps for every learner after each session.'],
      ['Progress tracked', 'Improvement tracked session over session.'],
    ],
  },
  {
    id: 'feat-3',
    number: '03',
    eyebrow: 'LEARNING JOURNEYS & CONTENT LIBRARY',
    title: 'Guided paths that turn practice into a habit',
    copy:
      'Sequence roleplays, micro-learning, and reinforcement into journeys — or start from ready-made programs and make them yours.',
    dark: true,
    visual: 'journey',
    bullets: [
      ['Guided paths', 'Guided, multi-step learning paths'],
      ['Micro-learning', 'Bite-sized micro-learning videos'],
      ['Ready-made programs', 'Ready-made programs, live in minutes'],
    ],
  },
  {
    id: 'feat-4',
    number: '04',
    eyebrow: 'CUSTOMIZATION',
    title: 'Build any scenario or persona — no engineering needed',
    copy:
      'Your L&D team designs roleplays in a visual builder: pick an industry, write the situation, shape the persona, and publish. No tickets, no dev time.',
    visual: 'builder',
    bullets: [
      ['Visual builder', 'Visual scenario & persona builder'],
      ['Tune the experience', 'Tune difficulty, voice, dialect & goals'],
      ['Publish fast', 'Publish to any team in minutes'],
    ],
  },
  {
    id: 'feat-5',
    number: '05',
    eyebrow: 'TEAM MANAGEMENT & ADMIN',
    title: 'Run training across the whole organization',
    copy:
      "Manage seats, assign cohorts, and give managers a live view of their team's progress — all from one admin console.",
    dark: true,
    visual: 'team',
    bullets: [
      ['Seats', 'Seat management & bulk invites'],
      ['Cohorts', 'Cohort assignment by role or region'],
      ['Manager views', 'Manager views of team progress'],
    ],
  },
  {
    id: 'feat-6',
    number: '06',
    eyebrow: 'ANALYTICS & REPORTING',
    title: 'Reporting that ties training to the business',
    copy:
      'See exactly where skills are strong, where the gaps are, and how practice connects to the metrics leadership actually cares about — not just completion rates.',
    visual: 'analytics',
    bullets: [
      ['Skill gaps', 'Skill-gap analysis across cohorts'],
      ['Custom KPIs', 'Custom KPIs mapped to your goals'],
      ['Business metrics', 'Ties to business metrics, not just completion'],
    ],
  },
  {
    id: 'feat-7',
    number: '07',
    eyebrow: 'API INTEGRATION',
    title: 'Drop Speekr straight into your LMS or platform',
    copy:
      'Launch roleplays, pull scores, and sync learners programmatically — so Speekr lives inside the tools your teams already use.',
    dark: true,
    visual: 'api',
    bullets: [
      ['REST API', 'REST API for roleplays, scores & learners'],
      ['Integrations', 'LMS, SCORM & webhook integrations'],
      ['Provisioning', 'SSO & SCIM provisioning included'],
    ],
  },
];

function CheckBullet({ title, copy, dark }) {
  return (
    <Stack direction="row" spacing={1.75} alignItems="flex-start">
      <Box
        component="span"
        sx={{
          flex: '0 0 auto',
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: lime,
          color: forestDark,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 900,
          mt: 0.15,
        }}
      >
        ✓
      </Box>
      <Box>
        {title && copy && (
          <Typography sx={{ color: dark ? cream : '#284a37', fontSize: 16, fontWeight: 700 }}>
            {title}
          </Typography>
        )}
        <Typography
          sx={{
            color: dark ? 'rgba(238,244,204,.65)' : '#284a37',
            fontSize: title && copy ? 14 : 16,
            lineHeight: 1.5,
            fontWeight: title && copy ? 400 : 500,
          }}
        >
          {copy || title}
        </Typography>
      </Box>
    </Stack>
  );
}

function RoleplayVisual() {
  return (
    <Box sx={visualShell}>
      <Stack direction="row" justifyContent="space-between" sx={{ background: forestDark, p: 2 }}>
        <Typography sx={{ color: cream, fontSize: 13, fontWeight: 700 }}>
          <Box component="span" sx={statusDot} /> Live roleplay
        </Typography>
        <Typography sx={{ color: 'rgba(238,244,204,.6)', fontSize: 12, fontWeight: 700 }}>
          Sales · Emirati dialect
        </Typography>
      </Stack>
      <Stack spacing={2} sx={{ p: 3, background: creamSoft }}>
        <ChatBubble name="Khalid · Procurement Lead" initials="K" text="السعر أعلى من الميزانية المعتمدة عندنا." rtl />
        <ChatBubble initials="You" text="أفهم تماماً — خلّني أوضّح العائد على الاستثمار خلال ٩٠ يوم." mine rtl />
        <Stack direction="row" spacing={1.5} alignItems="center" sx={miniPanel}>
          <Box sx={{ ...smallIcon, borderRadius: '9px' }}>▮▮</Box>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.35, height: 22 }}>
            {[40, 75, 55, 95, 35, 70, 50, 85, 60, 45].map((height, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: `${height}%`,
                  background: index % 3 === 2 ? forest : lime,
                  borderRadius: '2px',
                }}
              />
            ))}
          </Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: forest }}>0:42</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

function ChatBubble({ name, initials, text, mine, rtl }) {
  return (
    <Stack direction={mine ? 'row-reverse' : 'row'} spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          flex: '0 0 auto',
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: mine ? lime : forest,
          color: mine ? forestDark : cream,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 800,
        }}
      >
        {initials}
      </Box>
      <Box sx={{ maxWidth: '78%', textAlign: mine ? 'right' : 'left' }}>
        {name && <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#6a7264', mb: 0.6 }}>{name}</Typography>}
        <Box
          sx={{
            background: mine ? forest : '#fff',
            color: mine ? cream : '#1f3b2c',
            border: mine ? 'none' : '1px solid rgba(0,66,37,.08)',
            borderRadius: mine ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
            px: 1.9,
            py: 1.5,
            fontSize: 15,
            fontWeight: 600,
            direction: rtl ? 'rtl' : 'ltr',
          }}
        >
          {text}
        </Box>
        {!mine && (
          <Box component="span" sx={{ display: 'inline-block', mt: 0.9, fontSize: 11, fontWeight: 800, color: orange, background: 'rgba(245,100,49,.1)', px: 1.1, py: 0.4, borderRadius: 12 }}>
            Objection detected
          </Box>
        )}
      </Box>
    </Stack>
  );
}

function FeedbackVisual() {
  const rows = [
    ['Clarity', '86%', lime],
    ['Empathy', '91%', forest],
    ['Questioning', '78%', orange],
    ['Tone', '88%', lime],
    ['Word choice', '82%', lavender],
  ];
  return (
    <Box sx={lightVisualShell}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Typography sx={{ color: forest, fontSize: 15, fontWeight: 700 }}>Session feedback</Typography>
        <Box sx={{ color: forestDark, background: lime, px: 1.25, py: 0.5, borderRadius: 14, fontSize: 12, fontWeight: 800 }}>Overall 85</Box>
      </Stack>
      <Stack spacing={1.75} sx={{ mb: 2.5 }}>
        {rows.map(([label, value, color]) => (
          <Box key={label}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography sx={{ color: '#3a4a3e', fontSize: 13, fontWeight: 700 }}>{label}</Typography>
              <Typography sx={{ color: '#3a4a3e', fontSize: 13, fontWeight: 700 }}>{value}</Typography>
            </Stack>
            <Box sx={{ height: 8, borderRadius: 8, background: '#eef0d8' }}>
              <Box sx={{ width: value, height: '100%', borderRadius: 8, background: color }} />
            </Box>
          </Box>
        ))}
      </Stack>
      <Box sx={{ background: creamSoft, borderLeft: `3px solid ${lime}`, borderRadius: '8px', p: 2 }}>
        <Typography sx={{ color: forest, fontSize: 12, fontWeight: 800, mb: 0.6 }}>AI coaching note</Typography>
        <Typography sx={{ color: '#4b5a4e', fontSize: 14, lineHeight: 1.5 }}>
          Strong empathy on the objection. Next time, ask one more discovery question before proposing the ROI framing.
        </Typography>
      </Box>
    </Box>
  );
}

function JourneyVisual() {
  return (
    <Box sx={{ ...lightVisualShell, background: creamSoft, boxShadow: '0 30px 70px rgba(0,0,0,.4)' }}>
      <Typography sx={{ color: orange, fontSize: 12, fontWeight: 900, letterSpacing: '.1em', mb: 2 }}>
        READY-MADE PROGRAM · PRESENTATION MASTERCLASS
      </Typography>
      <Stack spacing={1.5} sx={{ mb: 2.5 }}>
        <JourneyRow status="✓" title="Ep.1 · Structure the message" meta="Completed" done />
        <JourneyRow status="▶" title="Ep.2 · Speak with authority" progress="60%" active />
        <JourneyRow status="⌕" title="Ep.3 · Handle tough questions" meta="Locked" muted />
      </Stack>
      <Box sx={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: 120 }}>
        <Box component="img" src="/images/platform/micro-learning-video.png" alt="Micro-learning video" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,26,16,.25)' }}>
          <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.92)', color: forest, display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 0.4 }}>
            <Play size={18} fill="currentColor" />
          </Box>
        </Box>
        <Typography sx={{ position: 'absolute', left: 12, bottom: 10, color: cream, fontSize: 12, fontWeight: 700, textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>
          Micro-lesson · 3 min
        </Typography>
      </Box>
    </Box>
  );
}

function JourneyRow({ status, title, meta, progress, done, active, muted }) {
  return (
    <Stack
      direction="row"
      spacing={1.75}
      alignItems="center"
      sx={{
        background: '#fff',
        borderRadius: '14px',
        p: '14px 16px',
        border: active ? `1.5px solid ${lime}` : '1px solid rgba(0,66,37,.08)',
        opacity: muted ? 0.62 : 1,
      }}
    >
      <Box sx={{ ...roundStatus, background: done ? lime : active ? orange : '#e6ecc8', color: done ? forestDark : active ? '#fff' : '#8a927a' }}>{status}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ color: forest, fontSize: 15, fontWeight: 700 }}>{title}</Typography>
        {meta && <Typography sx={{ color: '#8a927a', fontSize: 12 }}>{meta}</Typography>}
        {progress && <Box sx={{ height: 5, borderRadius: 5, background: '#eef0d8', mt: 0.75 }}><Box sx={{ width: progress, height: '100%', borderRadius: 5, background: orange }} /></Box>}
      </Box>
      {progress && <Typography sx={{ color: orange, fontSize: 13, fontWeight: 800 }}>{progress}</Typography>}
    </Stack>
  );
}

function BuilderVisual() {
  return (
    <Box sx={lightVisualShell}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Typography sx={{ color: forest, fontSize: 15, fontWeight: 700 }}>Scenario builder</Typography>
        <Box sx={{ color: forestDark, background: lime, px: 1.25, py: 0.5, borderRadius: 14, fontSize: 11, fontWeight: 900 }}>NO CODE</Box>
      </Stack>
      <Stack spacing={1.75}>
        <BuilderPanel label="Industry">
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {['Telecom', 'Banking', 'Retail'].map((item, index) => (
              <Box key={item} sx={{ color: index === 0 ? forestDark : '#6a7264', background: index === 0 ? lime : '#fff', border: index === 0 ? 'none' : '1px solid rgba(0,66,37,.1)', px: 1.5, py: 0.75, borderRadius: 16, fontSize: 13, fontWeight: 700 }}>{item}</Box>
            ))}
          </Stack>
        </BuilderPanel>
        <BuilderPanel label="Scenario">
          <Typography sx={{ color: forest, fontSize: 15, fontWeight: 700 }}>Angry customer · billing dispute</Typography>
        </BuilderPanel>
        <BuilderPanel label="Persona difficulty">
          <Box sx={{ height: 6, borderRadius: 6, background: '#eef0d8', position: 'relative' }}>
            <Box sx={{ width: '72%', height: '100%', borderRadius: 6, background: `linear-gradient(90deg,${lime},${orange})` }} />
            <Box sx={{ position: 'absolute', left: '70%', top: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, borderRadius: '50%', background: '#fff', border: `2px solid ${orange}` }} />
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.75 }}>
            <Typography sx={mutedTiny}>Calm</Typography>
            <Typography sx={mutedTiny}>Challenging</Typography>
          </Stack>
        </BuilderPanel>
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 2.25 }}>
        <Box sx={{ background: forest, color: '#fff', px: 2.75, py: 1.35, borderRadius: 24, fontSize: 14, fontWeight: 700 }}>Save scenario</Box>
      </Stack>
    </Box>
  );
}

function BuilderPanel({ label, children }) {
  return (
    <Box sx={{ background: creamSoft, borderRadius: '12px', p: '14px 16px' }}>
      <Typography sx={{ color: '#8a927a', fontSize: 12, fontWeight: 700, mb: 0.75 }}>{label}</Typography>
      {children}
    </Box>
  );
}

function TeamVisual() {
  const rows = [
    ['MA', 'Maha A.', 'Sales · KSA', '88%', lime, forest],
    ['YK', 'Yusuf K.', 'Care · UAE', '54%', lavender, orange],
    ['LN', 'Lina N.', 'Leadership', '92%', '#cfe4f5', forest],
  ];
  return (
    <Box sx={{ ...lightVisualShell, boxShadow: '0 30px 70px rgba(0,0,0,.4)' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.25 }}>
        <Typography sx={{ color: forest, fontSize: 15, fontWeight: 700 }}>Team overview</Typography>
        <Box sx={{ color: forest, background: creamSoft, px: 1.75, py: 0.8, borderRadius: 16, fontSize: 13, fontWeight: 700 }}>142 / 200 seats</Box>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr .8fr', gap: 1.25, px: 1.5, pb: 1, color: '#8a927a', fontSize: 11, fontWeight: 900, letterSpacing: '.06em' }}>
        <span>MEMBER</span><span>COHORT</span><span>PROGRESS</span>
      </Box>
      <Stack spacing={0.25}>
        {rows.map(([initials, name, cohort, progress, avatarBg, progressColor], index) => (
          <Box key={name} sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr .8fr', gap: 1.25, alignItems: 'center', background: index % 2 === 0 ? creamSoft : 'transparent', borderRadius: '10px', p: 1.5 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: avatarBg, color: forestDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900 }}>{initials}</Box>
              <Typography sx={{ color: forest, fontSize: 14, fontWeight: 700 }}>{name}</Typography>
            </Stack>
            <Typography sx={{ color: '#6a7264', fontSize: 13, fontWeight: 600 }}>{cohort}</Typography>
            <Typography sx={{ color: progressColor, fontSize: 13, fontWeight: 900 }}>{progress}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function AnalyticsVisual() {
  return (
    <Box sx={lightVisualShell}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 2.5 }}>
        {[
          ['Avg score', '84', forest],
          ['Completion', '92%', forest],
          ['At-risk', '7', orange],
        ].map(([label, value, color]) => (
          <Box key={label} sx={{ background: creamSoft, borderRadius: '12px', p: 1.75 }}>
            <Typography sx={mutedTiny}>{label}</Typography>
            <Typography variant="h3" sx={{ color, fontSize: 26 }}>{value}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ background: creamSoft, borderRadius: '12px', p: 2, mb: 2 }}>
        <Typography sx={{ color: forest, fontSize: 12, fontWeight: 800, mb: 1.75 }}>Skill trend · last 6 weeks</Typography>
        <Stack direction="row" alignItems="flex-end" spacing={1.25} sx={{ height: 90 }}>
          {[45, 55, 50, 70, 82, 95].map((height, index) => (
            <Box key={index} sx={{ flex: 1, height: `${height}%`, background: index < 2 ? '#cfe0a0' : index < 4 ? lime : forest, borderRadius: '4px 4px 0 0' }} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ background: creamSoft, borderRadius: '12px', p: 2 }}>
        <Typography sx={{ color: forest, fontSize: 12, fontWeight: 800, mb: 1.5 }}>Top skill gaps</Typography>
        {['Questioning −12%', 'Objection handling −8%'].map((item) => (
          <Typography key={item} sx={{ color: '#4b5a4e', fontSize: 13, fontWeight: 700, mb: 0.75 }}>{item}</Typography>
        ))}
      </Box>
    </Box>
  );
}

function ApiVisual() {
  return (
    <Box sx={{ background: '#03170f', border: '1px solid rgba(141,198,63,.2)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.45)' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ background: '#062c1d', p: '12px 18px' }}>
        {[orange, '#f6c85f', lime].map((color) => <Box key={color} sx={{ width: 11, height: 11, borderRadius: '50%', background: color }} />)}
        <Typography sx={{ ml: 1.25, color: 'rgba(238,244,204,.55)', fontSize: 12, fontWeight: 700 }}>POST /v1/roleplays</Typography>
      </Stack>
      <Box sx={{ p: 2.75, fontFamily: 'ui-monospace, Menlo, monospace', color: '#cfe0a0', fontSize: { xs: 11.5, sm: 13 }, lineHeight: 1.7, overflowX: 'auto' }}>
        <div><span style={{ color: lime }}>curl</span> -X POST https://api.speekr.ai/v1/roleplays \</div>
        <div style={{ paddingLeft: 18 }}><span style={{ color: lavender }}>-H</span> <span style={{ color: '#f6c85f' }}>"Authorization: Bearer sk_live_•••"</span> \</div>
        <div style={{ paddingLeft: 18 }}><span style={{ color: lavender }}>-d</span> <span style={{ color: '#f6c85f' }}>'{'{'} "scenario":"objection_pricing",</span></div>
        <div style={{ paddingLeft: 40, color: '#f6c85f' }}>"persona":"khalid_emirati",</div>
        <div style={{ paddingLeft: 40, color: '#f6c85f' }}>"learner":"usr_8241" {'}'}'</div>
        <div style={{ marginTop: 14, color: 'rgba(238,244,204,.4)' }}>→ 200 OK</div>
        <div>{'{'} <span style={{ color: lime }}>"roleplay_id"</span>: <span style={{ color: '#f6c85f' }}>"rp_5f2a"</span>, <span style={{ color: lime }}>"status"</span>: <span style={{ color: '#f6c85f' }}>"ready"</span> {'}'}</div>
      </Box>
      <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap" sx={{ borderTop: '1px solid rgba(141,198,63,.14)', p: '16px 22px' }}>
        {['LMS', 'SCORM', 'Webhooks', 'SSO / SCIM'].map((tag) => (
          <Box key={tag} sx={{ color: 'rgba(238,244,204,.7)', border: '1px solid rgba(141,198,63,.22)', px: 1.5, py: 0.75, borderRadius: 16, fontSize: 12, fontWeight: 700 }}>{tag}</Box>
        ))}
      </Stack>
    </Box>
  );
}

function Visual({ type }) {
  if (type === 'roleplay') return <RoleplayVisual />;
  if (type === 'feedback') return <FeedbackVisual />;
  if (type === 'journey') return <JourneyVisual />;
  if (type === 'builder') return <BuilderVisual />;
  if (type === 'team') return <TeamVisual />;
  if (type === 'analytics') return <AnalyticsVisual />;
  return <ApiVisual />;
}

function FeatureSection({ feature }) {
  const text = (
    <Box>
      <Box sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        background: feature.dark ? 'rgba(141,198,63,.14)' : 'rgba(245,100,49,.12)',
        color: feature.dark ? lime : orange,
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: '.08em',
        px: 1.75,
        py: 0.9,
        borderRadius: 20,
        mb: 2.75,
      }}>
        {feature.number} · {feature.eyebrow}
      </Box>
      <Typography variant="h2" sx={{ color: feature.dark ? cream : forest, fontSize: { xs: '2.25rem', md: '2.625rem' }, lineHeight: 1.06, mb: 2.25 }}>
        {feature.title}
      </Typography>
      <Typography sx={{ color: feature.dark ? 'rgba(238,244,204,.72)' : '#4b5a4e', fontSize: { xs: 16, md: 18 }, lineHeight: 1.6, maxWidth: 480, mb: 3.75 }}>
        {feature.copy}
      </Typography>
      <Stack spacing={2}>
        {feature.bullets.map(([title, copy]) => (
          <CheckBullet key={title} title={feature.dark && feature.id === 'feat-1' ? title : null} copy={feature.dark && feature.id === 'feat-1' ? copy : `${title === 'Scoring' ? copy : copy}`} dark={feature.dark} />
        ))}
      </Stack>
    </Box>
  );
  const visual = <Visual type={feature.visual} />;

  return (
    <Box
      id={feature.id}
      component="section"
      sx={{
        background: feature.dark
          ? 'linear-gradient(160deg,#06281b,#0b3625 60%,#052016)'
          : cream,
        py: { xs: 7, md: 11 },
        scrollMarginTop: '96px',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          px: { xs: 2.5, md: 4 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 4, lg: 7 },
          alignItems: 'center',
        }}
      >
        <Box sx={{ order: { xs: 2, lg: feature.dark ? 1 : 2 } }}>{feature.dark ? text : visual}</Box>
        <Box sx={{ order: { xs: 1, lg: feature.dark ? 2 : 1 } }}>{feature.dark ? visual : text}</Box>
      </Container>
    </Box>
  );
}

const visualShell = {
  background: '#fff',
  borderRadius: '22px',
  overflow: 'hidden',
  boxShadow: '0 30px 70px rgba(0,0,0,.4)',
};

const lightVisualShell = {
  background: '#fff',
  borderRadius: '22px',
  p: { xs: 2.5, md: 3.5 },
  boxShadow: '0 24px 60px rgba(0,50,25,.12)',
};

const statusDot = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: lime,
  mr: 1,
};

const smallIcon = {
  width: 32,
  height: 32,
  background: lime,
  color: forestDark,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const miniPanel = {
  background: '#fff',
  borderRadius: '14px',
  p: '12px 15px',
  border: '1px solid rgba(0,66,37,.08)',
};

const roundStatus = {
  flex: '0 0 auto',
  width: 34,
  height: 34,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  fontWeight: 900,
};

const mutedTiny = {
  color: '#8a927a',
  fontSize: 11,
};

function PlatformPage({ onDemoClick }) {
  return (
    <Box component="main" sx={{ background: cream, color: forest, overflowX: 'clip' }}>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 13, md: 16 },
          pb: { xs: 7, md: 7.25 },
          background: `radial-gradient(120% 90% at 80% 0%,#F4F8D6 0%,${cream} 55%,#E9F0C2 100%)`,
          textAlign: 'center',
          borderBottom: '1px solid rgba(0,66,37,.07)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,66,37,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,66,37,.05) 1px,transparent 1px)',
            backgroundSize: '46px 46px',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2.5, md: 4 }, position: 'relative' }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: '#5D8A3C',
              mb: 2.25,
            }}
          >
            Platform
          </Typography>
          <Typography variant="h1" sx={{ maxWidth: 880, mx: 'auto', color: forest, fontSize: { xs: '3rem', sm: '4.25rem', md: '4.125rem' }, lineHeight: 1.04, mb: 2.5 }}>
            One platform for every <Box component="span" sx={{ color: orange }}>conversation</Box> your teams need to win
          </Typography>
          <Typography sx={{ maxWidth: 640, mx: 'auto', color: '#4b5a4e', fontSize: { xs: 17, md: 20 }, lineHeight: 1.55, mb: 4 }}>
            From AI roleplay and instant coaching to admin, analytics, and API — everything you need to build communication skills at scale, in English and 15+ Arabic dialects.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} justifyContent="center" sx={{ mb: 2 }}>
            <Button variant="contained" endIcon={<ArrowRight size={18} />} onClick={onDemoClick} sx={{ background: forest, color: '#fff', fontSize: 16, px: 3.5, '&:hover': { background: orange } }}>
              Book a demo
            </Button>
            <Button variant="outlined" startIcon={<Play size={15} fill="currentColor" />} sx={{ color: forest, border: '1.5px solid rgba(0,66,37,.25)', fontSize: 16, px: 3.25, '&:hover': { borderColor: orange, background: 'rgba(245,100,49,.06)' } }}>
              Watch overview
            </Button>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.75, sm: 3 }} justifyContent="center" sx={{ color: '#3a4a3e', fontSize: 14, fontWeight: 700 }}>
            <span>✓ SSO & admin</span>
            <span>✓ Arabic + English</span>
            <span>✓ API & LMS integration</span>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2.5, md: 4 }, py: { xs: 4, md: 7.5 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Box key={pillar.id} component="a" href={`#${pillar.id}`} sx={{ textDecoration: 'none', background: creamSoft, border: '1px solid rgba(0,66,37,.1)', borderRadius: '18px', p: 3, color: forest, transition: 'transform .18s ease, border-color .18s ease', '&:hover': { transform: 'translateY(-3px)', borderColor: orange, color: forest } }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: pillar.color, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Icon size={22} color={pillar.iconColor} />
                </Box>
                <Typography variant="h3" sx={{ color: forest, fontSize: 18, mb: 0.75 }}>{pillar.title}</Typography>
                <Typography sx={{ color: '#6a7264', fontSize: 13, lineHeight: 1.5 }}>{pillar.copy}</Typography>
              </Box>
            );
          })}
          <Box sx={{ background: 'linear-gradient(135deg,#004225,#0b3625)', borderRadius: '18px', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ color: cream, fontSize: 20, lineHeight: 1.15, mb: 1.25 }}>
              Seven pillars. One workflow.
            </Typography>
            <Button variant="text" endIcon={<ArrowRight size={16} />} onClick={onDemoClick} sx={{ alignSelf: 'flex-start', color: lime, px: 0, minHeight: 'auto', '&:hover': { background: 'transparent', color: cream } }}>
              Book a demo
            </Button>
          </Box>
        </Box>
      </Container>

      {features.map((feature) => (
        <FeatureSection key={feature.id} feature={feature} />
      ))}

      <Box sx={{ background: cream, px: { xs: 2.5, md: 4 }, py: { xs: 7, md: '56px' } }}>
        <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: 0 }}>
          <Box sx={{ position: 'relative', background: 'linear-gradient(135deg,#F56431 0%,#e0431a 100%)', borderRadius: '28px', p: { xs: 3.5, md: '64px 60px' }, overflow: 'hidden', textAlign: 'center' }}>
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%,rgba(255,255,255,.14) 0,transparent 40%),radial-gradient(circle at 85% 90%,rgba(0,66,37,.25) 0,transparent 45%)' }} />
            <Box sx={{ position: 'relative' }}>
              <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2.5rem', md: '3.125rem' }, maxWidth: 720, mx: 'auto', lineHeight: 1.05, mb: 2 }}>
                Put the whole platform to work on your team's conversations.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.9)', fontSize: { xs: 16.5, md: 19 }, lineHeight: 1.5, maxWidth: 560, mx: 'auto', mb: 4 }}>
                A 20-minute walkthrough of roleplay, coaching, admin, analytics, and API — with a scenario built for your team.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button variant="contained" endIcon={<ArrowRight size={18} />} onClick={onDemoClick} sx={{ background: forest, color: '#fff', fontSize: 17, px: 4.25, '&:hover': { background: '#fff', color: forest } }}>
                  Book a demo
                </Button>
                <Button variant="outlined" onClick={onDemoClick} sx={{ background: 'rgba(255,255,255,.16)', color: '#fff', fontSize: 17, px: 4.25, border: '1.5px solid rgba(255,255,255,.4)', '&:hover': { background: 'rgba(255,255,255,.22)', borderColor: '#fff' } }}>
                  Talk to sales
                </Button>
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0.75, md: 3.25 }} justifyContent="center" sx={{ mt: 3, color: 'rgba(255,255,255,.85)', fontSize: 14, fontWeight: 700 }}>
                <span>✓ Encryption & GDPR-level security</span>
                <span>✓ Regional hosting</span>
                <span>✓ SSO</span>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default PlatformPage;

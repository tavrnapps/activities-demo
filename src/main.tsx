import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ActivityBoundary,
  connectActivityHost,
  createActivity,
  type ActivityHost,
} from '@tavrnapps/activities-sdk';
import './styles.css';

const counterActivity = createActivity({
  manifest: {
    id: 'top.tavrn.examples.shared-counter',
    name: 'Shared Counter',
    version: '1.0.0',
    description: 'A tiny real-time counter for testing Tavrn Activities.',
    permissions: ['room.read', 'participants.read'],
    placements: ['room', 'call'],
  },
  render: ({ host }) => <Counter host={host} />,
});

function Counter({ host }: { host: ActivityHost }) {
  const [count, setCount] = useState(0);
  const [participantCount, setParticipantCount] = useState<number | null>(null);
  const [lastActor, setLastActor] = useState<string | null>(null);

  useEffect(() => {
    void host.getParticipants().then(people => setParticipantCount(people.length)).catch(() => setParticipantCount(null));
    return host.subscribe<{ amount: number }>('counter.increment', event => {
      const amount = Number(event.payload?.amount ?? 1);
      setCount(value => value + (Number.isFinite(amount) ? amount : 1));
      setLastActor(event.senderId === host.context.currentUser.id ? 'You' : 'Someone else');
    });
  }, [host]);

  const increment = () => void host.emit('counter.increment', { amount: 1 });
  const place = host.context.placement === 'call' ? 'this call' : host.context.room?.name ?? 'this room';

  return <main className="shell">
    <div className="eyebrow">TAVRN ACTIVITY DEMO</div>
    <h1>Shared Counter</h1>
    <p className="intro">Everyone using this Activity in {place} receives the same increment events.</p>
    <section className="counter" aria-live="polite">
      <span>{count}</span>
      <button onClick={increment}>Add one</button>
    </section>
    <footer>
      <span>{participantCount === null ? 'Participant access not granted' : `${participantCount} participant${participantCount === 1 ? '' : 's'}`}</span>
      <span>{lastActor ?? 'Waiting for an increment'}</span>
    </footer>
  </main>;
}

async function boot() {
  const root = createRoot(document.getElementById('root')!);
  try {
    const host = await connectActivityHost(counterActivity.manifest);
    root.render(<ActivityBoundary activity={counterActivity} host={host} />);
  } catch (error) {
    root.render(<main className="shell error"><div className="eyebrow">TAVRN ACTIVITY DEMO</div><h1>Open this in Tavrn</h1><p>This demo connects to Tavrn’s reviewed Activity host. Run it from an approved Tavrn Activity session to try the shared counter.</p></main>);
    console.error(error);
  }
}

void boot();

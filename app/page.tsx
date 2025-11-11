import WaitlistForm from "./WaitlistForm";

export default async function WaitlistPage() {
  // skip count for now
  return (
    <main className="min-h-screen flex items-center justify-center">
      <WaitlistForm />
    </main>
  );
}

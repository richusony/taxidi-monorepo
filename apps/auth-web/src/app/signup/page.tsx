import { AuthContent } from 'src/components/AuthContent';
import { SignUpSection } from 'src/components/SignUpSection';

export default function SignUpPage() {
  return (
    <main className="flex">
      <AuthContent />
      <SignUpSection />
    </main>
  );
}

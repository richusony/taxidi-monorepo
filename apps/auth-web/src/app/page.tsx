import { AuthContent } from 'src/components/AuthContent';
import { LoginSection } from 'src/components/LoginSection';

export default function LoginPage() {
  return (
    <main className="flex">
      <AuthContent />
      <LoginSection />
    </main>
  );
}

import { Button } from "app/common/components/ui/button";

export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">환영합니다!</h1>
      <div className="space-y-4">
        <p className="text-lg text-muted-foreground">
          이곳에서 새로운 프로젝트를 시작하세요.
        </p>
        <Button>시작하기</Button>
      </div>
    </main>
  );
}
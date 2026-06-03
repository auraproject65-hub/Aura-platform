import { AI_ETHICS_STATEMENT } from '@/lib/legal';

export default function EthicsPage() {
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{
          __html: AI_ETHICS_STATEMENT
            .replace(/\n/g, '<br/>')
            .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-4">$1</h3>')
            .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6">$1</h2>'),
        }}
      />
    </div>
  );
}

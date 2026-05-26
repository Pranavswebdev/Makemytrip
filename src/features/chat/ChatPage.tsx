import { Wordmark } from "../../components/Wordmark";

export function ChatPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <Wordmark />
      <h2 className="mt-5 font-serif text-[24px] text-heading">Chat</h2>
      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
        Chat is coming soon.
      </p>
    </div>
  );
}

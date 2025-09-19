export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-4 pb-20">
      <div className="inline-block max-w-lg w-full text-center justify-center">
        {children}
      </div>
    </section>
  );
}

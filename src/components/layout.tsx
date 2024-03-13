export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8">
      <main>{children}</main>
    </div>
  );
}

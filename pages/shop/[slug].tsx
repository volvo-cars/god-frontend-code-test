import { useRouter } from "next/router";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>{router.query.slug}</h1>
    </div>
  );
}

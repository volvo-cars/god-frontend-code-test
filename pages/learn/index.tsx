import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
const Learn = () => {
  return (
    <Link href="/" role="heading" aria-level={1}>
      GO HOME
    </Link>
  );
};

export default Learn;

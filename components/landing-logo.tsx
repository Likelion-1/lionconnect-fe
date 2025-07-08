import Image from "next/image";

export default function LandingLogo() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/images/landing-logo.png"
        alt="로고"
        width={200}
        height={80}
      />
    </div>
  );
}

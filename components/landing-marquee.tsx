import Marquee from '@/components/ui/marquee'

const logos = [
  { src: "https://seeklogo.com/images/P/polygon-matic-logo-9078364E20-seeklogo.com.png", alt: "Polygon" },
  { src: "https://cdn.icon-icons.com/icons2/2429/PNG/512/ethereum_logo_icon_147293.png", alt: "etherum" },
  { src: "https://app.nfts2me.com/assets/chains/base-goerli.png", alt: "Base" },
  { src: "https://freelogopng.com/images/all_img/1683021055metamask-icon.png", alt: "metamsk" },
  { src: "https://logos-world.net/wp-content/uploads/2024/01/Solana-Logo-500x281.png", alt: "Solana" },
];

interface Web3LogosMarqueeProps {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

export default function LandingMarquee({
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 4,
}: Web3LogosMarqueeProps) {
  return (
    <>
    <Marquee
      className="my-8"
      reverse={true}
      pauseOnHover={pauseOnHover}
      vertical={vertical}
      repeat={repeat}
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="h-16 w-auto mx-4 object-contain"
        />
      ))}
    </Marquee>
    <Marquee
    className="my-8"
    reverse={false}
    pauseOnHover={pauseOnHover}
    vertical={vertical}
    repeat={repeat}
  >
    {logos.map((logo, index) => (
      <img
        key={index}
        src={logo.src}
        alt={logo.alt}
        className="h-16 w-auto mx-4 object-contain"
      />
    ))}
  </Marquee>
  </>
  );
}

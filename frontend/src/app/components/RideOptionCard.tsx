import boltIcon from "@/public/bolt.ico";
import uberIcon from "@/public/uber.png";
import { useIntlCurrencyFormatter } from "@/src/hooks";
import {
  CarType,
  PriceType,
  ProviderType,
  RideInformation,
  RidePrice,
  assertFixedPrice,
  assertRangePrice,
} from "@/src/types";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";

export type RideOptionCardProps = {
  data: RideInformation;
  onClick?: (id: string) => void;
  active?: boolean;
};

const providerIconMapping: Record<ProviderType, StaticImageData> = {
  [ProviderType.Bolt]: boltIcon,
  [ProviderType.Uber]: uberIcon,
};

const priceCalculationMapping: Record<PriceType, (price: RidePrice) => number> = {
  [PriceType.Fixed]: (price) => {
    assertFixedPrice(price);
    return price.fixed;
  },
  [PriceType.Range]: (price) => {
    assertRangePrice(price);
    return (price.low + price.high) / 2;
  },
};

const carTypeColorMapping: Record<CarType, string> = {
  [CarType.Eco]: "text-green-600",
  [CarType.Large]: "text-blue-600",
  [CarType.Luxurious]: "text-amber-600",
};

export default function RideOptionCard({
  active = false,
  data,
  onClick: onClickProp,
}: RideOptionCardProps) {
  const intlFormatter = useIntlCurrencyFormatter();
  const carTypeTextColor = carTypeColorMapping[data.carType];
  const price = priceCalculationMapping[data.price.type](data.price);
  const providerIcon = providerIconMapping[data.provider];

  const onClick = () => {
    if (typeof onClickProp === "function") {
      onClickProp(data.id);
    }
  };

  return (
    <div
      className={clsx(
        "flex rounded-lg border p-3 sm:p-5 md:p-8 cursor-pointer",
        active && "border-sky-500"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col flex-1 gap-y-2">
        <div className="flex items-center">
          <Image
            className="rounded-lg overflow-hidden"
            src={providerIcon.src}
            width={24}
            height={24}
            alt="provider icon"
          />
          <p className="font-semibold ms-2">{data.provider}</p>
        </div>
        <div>
          <p className="text-slate-400">{data.durationMinutes} min</p>
          <p className={clsx("font-semibold", carTypeTextColor)}>{data.carType}</p>
        </div>
      </div>
      <div className="flex items-center font-semibold text-lg">
        {intlFormatter.fmt(price, { currency: data.currency })}
      </div>
    </div>
  );
}

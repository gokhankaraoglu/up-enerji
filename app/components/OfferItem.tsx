import React from "react";
import { Icon, Icons } from "./elements/Icon";
import { contractText } from "../contracts";
import Spinner from "./elements/Spinner";
import Image from "next/image";
import { EntegrasyonPoliceDurumID } from "../types/product";
import { formatName } from "../utils";

interface OfferItemProps {
  company: string;
  title: string;
  price: number;
  policeStatusId: number;
  status?: string;
}

function OfferItem({ title, company, price, policeStatusId }: OfferItemProps) {
  return (
    <div className="rounded-xl max-w-[405px] w-full bg-white p-4 border-solid border-[1px] border-[#0F1827]">
      <div className="flex mb-3.5 w-full">
        <Image src="/axa-logo.png" alt="Axa logo" width="54" height="54" />
        <div className="ml-3.5 flex flex-col justify-between">
          <p className="text-base font-semibold">{formatName(title)}</p>
          <div className="text-[#667085] text-lg font-extralight">
            {EntegrasyonPoliceDurumID.TEKLIF === policeStatusId ? (
              <span>₺{price}</span>
            ) : EntegrasyonPoliceDurumID.BEKLIYOR === policeStatusId ? (
              <Spinner />
            ) : (
              <p className="flex">
                <span className="flex items-center text-4xl mr-2">
                  &#128532;
                </span>
                <span>Bir hata oldu. Bilgileri kontrol ederek tekrar dene</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="flex text-xs font-light text-[#667085] items-center">
        <Icon icon={Icons.INFO_ICON} />
        <span className="ml-1">{formatName(company)} güvencesiyle</span>
      </p>
      <hr className="mb-2.5 mt-1.5 md:mb-3.5 md:mt-2.5 border-t-1 border-[#0F1827]" />
      <div>
        {contractText.map(({ title, icon }, index) => (
          <section className="mb-2 md:mb-3" key={index}>
            <div className="flex items-end text-[#667085]">
              <Icon icon={icon} className="h-5 w-5" />
              <h2 className="ml-2 text-xs font-light">{title}</h2>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default OfferItem;

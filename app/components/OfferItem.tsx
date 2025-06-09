"use client";
import React, { useEffect, useState } from "react";
import { Icon, Icons } from "./elements/Icon";
import { contractText } from "../contracts";
import Spinner from "./elements/Spinner";
import Image from "next/image";
import { EntegrasyonPoliceDurumID } from "../types/product";
import { formatName, getSessionStorage } from "../utils";

interface OfferItemProps {
  company: string;
  title: string;
  price: number;
  policeStatusId: number;
  status?: string;
}

function OfferItem({ title, company, price, policeStatusId }: OfferItemProps) {
  const [userVehicle, setUserVehicle] = useState<any>(null);

  useEffect(() => {
    const vehicle: any | undefined = getSessionStorage("vehicle");
    setUserVehicle(vehicle);
  }, []);

  return (
    <div className="rounded-2xl max-w-[405px] w-full bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center mb-6">
          <Image
            src="/axa-logo.png"
            alt="Axa logo"
            width="112"
            height="112"
            className="rounded-full bg-white border border-gray-200"
          />
          <div className="ml-4 flex flex-col justify-center">
            <span className="text-base font-medium">{formatName(title)}</span>
            <span className="text-2xl font-bold  mt-1">
              {EntegrasyonPoliceDurumID.TEKLIF === policeStatusId ? (
                <>₺{price?.toLocaleString("tr-TR")}</>
              ) : EntegrasyonPoliceDurumID.BEKLIYOR === policeStatusId ? (
                <Spinner />
              ) : (
                <span className="flex items-center text-sm font-medium">
                  <span className="flex items-center text-2xl mr-2">
                    &#128532;
                  </span>
                  Bir hata oldu. Bilgileri kontrol ederek tekrar dene
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center font-light text-sm mb-2">
          <Icon icon={Icons.INFO_ICON} />
          <span className="ml-1">{formatName(company)} güvencesiyle</span>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-2 text-xs font-semibold  border-b border-gray-100">
        ARAÇ BİLGİLERİ
      </div>
      <div className="px-6 py-3 border-b border-gray-100">
        {userVehicle && (
          <ul className="space-y-1">
            <li className="flex items-center text-sm ">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-900 mr-2"></span>
              <span>{userVehicle.plate || "-"}</span>
            </li>
            <li className="flex items-center text-sm ">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-900 mr-2"></span>
              <span>
                {userVehicle.year || "-"} {userVehicle.brand || "-"}{" "}
                {userVehicle.model || "-"}
              </span>
            </li>
          </ul>
        )}
      </div>

      <div className="bg-gray-100 px-6 py-2 text-xs font-semibold  border-b border-gray-100">
        TEMİNAT BİLGİLERİ
      </div>
      <div className="px-6 py-3">
        <ul className="space-y-4">
          {contractText.map(({ title, icon }, index) => (
            <li key={index} className="flex items-center text-sm ">
              {icon ? (
                <Image
                  src={`/${icon}`}
                  alt={title}
                  width={28}
                  height={28}
                  className="h-7 w-7 mr-2"
                />
              ) : (
                <span className="inline-block w-5 mr-2"></span>
              )}
              <span className="font-medium">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OfferItem;

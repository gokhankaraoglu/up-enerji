import Image from "next/image";
import Link from "next/link";
import CustomButton from "../components/elements/CustomButton";

interface PaymentFailedProps {
  redirectUrl: string;
}

function PaymentFailed({ redirectUrl }: PaymentFailedProps) {
  const handleRetry = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div className="flex flex-col justify-between items-center custom-min-height">
      <div className="flex flex-col justify-center items-center mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-10">
          İşleminiz Başarısız Oldu
        </h2>
        <Image
          width={136}
          height={136}
          alt="Failed"
          src="/failed.png"
          className="mb-10"
        />
        <p className="text-xl font-semibold mb-10">
          Maalesef, ödeme işleminiz gerçekleşemedi. Lütfen tekrar deneyin.
        </p>
      </div>
      <div className="mb-6 flex flex-col">
        <CustomButton saturated className="mb-6" onClick={handleRetry}>
          Tekrar Dene
        </CustomButton>
        <Link href="/">
          <CustomButton>Anasayfaya Dön</CustomButton>
        </Link>
      </div>
    </div>
  );
}

export default PaymentFailed;

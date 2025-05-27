import { Dialog } from "@headlessui/react";
import { contractText } from "@/app/contracts";
import Footer from "../components/Footer";
import CustomButton from "../components/elements/CustomButton";
import { Icon, Icons } from "../components/elements/Icon";

function InsuranceDetailDialog({
  isOpen,
  confirm,
  close,
}: {
  isOpen: boolean;
  confirm: () => void;
  close: () => void;
}) {
  return (
    <Dialog open={isOpen} onClose={() => close()}>
      <div className="z-1 fixed inset-0 flex justify-center items-end">
        <div
          className="w-full h-full z-0 absolute inset-0 opacity-50"
          onClick={close}
        />
        <div className="container relative flex items-end mx-1">
          <div className="bg-white rounded-t-3xl shadow w-full">
            <div className="p-4 flex items-center justify-end">
              <button
                className="focus:outline-none cursor-pointer"
                onClick={close}
              >
                <Icon icon={Icons.CLOSE_ICON} />
              </button>
            </div>
            <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:px-8">
              <p className="text-center text-2xl font-bold mb-10">
                Koruma Kapsamları
              </p>
              <div className="flex flex-col gap-y-8 h-[calc(80vh-15rem)] overflow-y-auto">
                {contractText.map(({ title, description }, index) => (
                  <section key={index}>
                    <div className="flex items-center text-[#667085] mb-2.5">
                      <h2 className="ml-2 text-2xl font-semibold">{title}</h2>
                    </div>
                    <p className="text-black text-sm font-light">
                      {description}
                    </p>
                  </section>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <CustomButton onClick={() => confirm()} className="mb-3.5">
                Devam Et
              </CustomButton>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default InsuranceDetailDialog;

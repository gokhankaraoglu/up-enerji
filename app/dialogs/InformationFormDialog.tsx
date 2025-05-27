import { Dialog } from "@headlessui/react";
import CustomButton from "../components/elements/CustomButton";
import { Icon, Icons } from "../components/elements/Icon";
import Footer from "../components/Footer";
import { contractText } from "../contracts";

function InformationFormDialog({
  isOpen,
  close,
  confirm,
}: {
  isOpen: boolean;
  close: () => void;
  confirm: () => void;
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
              <button className="focus:outline-none" onClick={close}>
                <Icon icon={Icons.CLOSE_ICON} />
              </button>
            </div>
            <div className="flex flex-col gap-4 px-4 py-6 sm:px-6 md:px-8">
              <p className="text-center text-2xl font-bold mb-10">
                Maksimum Kasko Sigortası Bilgilendirme Formu
              </p>
              <div className="h-[calc(80vh-15rem)] overflow-y-auto">
                {contractText.map(({ title, description }, index) => (
                  <section className="mb-8" key={index}>
                    {title && (
                      <div className="flex items-center text-black mb-2.5">
                        <h2 className="text-xs font-bold">{title}</h2>
                      </div>
                    )}
                    <p className="text-black text-xs font-normal">
                      {description}
                    </p>
                  </section>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <CustomButton
                form="form1"
                type="button"
                className="mb-3.5"
                onClick={confirm}
              >
                Okudum, kabul ediyorum.
              </CustomButton>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default InformationFormDialog;

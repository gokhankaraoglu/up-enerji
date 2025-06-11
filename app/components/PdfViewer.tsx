"use client";
import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Dialog } from "@headlessui/react";
import { Icon, Icons } from "./elements/Icon";
import CustomButton from "./elements/CustomButton";
import Footer from "./Footer";
import { getPolicyDocument } from "../utils/api/document";
import { base64ToUint8Array } from "../utils";
import Spinner from "./elements/Spinner";
import { Item } from "../types/document";

interface PdfViewerProps {
  policeId: string;
  entegrasyonPoliceHareketKey: string;
  isOpen: boolean;
  close: () => void;
}

function PdfViewer({
  policeId,
  entegrasyonPoliceHareketKey,
  isOpen,
  close,
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [policeData, setPoliceData] = useState<Item | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;
    }
    getPoliceDocument();
  }, []);

  const getPoliceDocument = async () => {
    const { Items } = await getPolicyDocument(entegrasyonPoliceHareketKey);
    if (Items[0]) {
      setPoliceData(Items[0]);
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      try {
        if (policeData?.BINARY_DATA) {
          const pdfData = base64ToUint8Array(policeData.BINARY_DATA);
          const pdf = await getDocument({ data: pdfData }).promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          if (!canvas) {
            return;
          }

          const context = canvas.getContext("2d");
          if (!context) {
            return;
          }

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error("PDF yüklenirken hata oluştu:", error);
      }
    };

    loadPdf();
  }, [isOpen, policeData]);

  const downloadPdf = (policeData: Item) => {
    const uint8Array = base64ToUint8Array(policeData.BINARY_DATA);
    const blob = new Blob([uint8Array], { type: policeData.CONTENT_TYPE });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = policeData.FILE_NAME || "download.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const savePolicetoUpenerji = ({ policeId }: { policeId: string }) => {
    console.log({ policeId });
  };

  return (
    <Dialog open={isOpen} onClose={() => close()}>
      <div className="z-1 fixed inset-0 flex justify-center items-end">
        <div className="absolute inset-0" onClick={close} />
        <div className="container bg-white rounded-t-3xl mx-1 relative">
          <div className="p-4 flex items-center justify-end border-b-2">
            <button className="focus:outline-none" onClick={close}>
              <Icon icon={Icons.CLOSE_ICON} />
            </button>
          </div>
          <div className="px-2 py-3 sm:px-6 md:px-8">
            <div className="flex flex-col h-[calc(75vh-15rem)] overflow-y-auto">
              {policeData ? (
                <canvas className="w-full" ref={canvasRef}></canvas>
              ) : (
                <Spinner className="mx-auto" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center pb-6 px-6">
            <div className="mb-3.5 flex flex-col items-center">
              <CustomButton onClick={() => savePolicetoUpenerji({ policeId })}>
                Poliçeni Up Enerji&#39;ye Kaydet
              </CustomButton>
              <p className="text-[#667085] font-normal text-xs text-center mt-1">
                Verileriniz Up Enerji içerisinde saklanır.Poliçe detaylarınıza
                daha sonra erişebilmeniz için önerilen yöntemdir.
              </p>
            </div>
            <CustomButton
              onClick={() => policeData?.BINARY_DATA && downloadPdf(policeData)}
              className="mb-3.5"
            >
              Poliçe İndir
            </CustomButton>
            <Footer />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default PdfViewer;

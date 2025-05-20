import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Bulunamadı</h2>
      <p className="mb-6">Üzgünüz, aradığın sayfa oluşturulmamış.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Anasayfaya Dön
      </Link>
    </div>
  );
}

export default NotFound;

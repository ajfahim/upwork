import React from "react";
import Card from "./ui/Card";
import Icon from "./ui/Icon";

interface DownloadPageProps {
  downloadUrl: string;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ downloadUrl }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#bae6fd]">
    <Card>
      <div className="flex justify-center mb-4">
        <Icon bgClass="bg-green-100">
          <span className="text-3xl">✅</span>
        </Icon>
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">File Ready!</h2>
      <p className="mb-6 text-gray-700">
        Your file has been generated. Click below to download.
      </p>
      {downloadUrl ? (
        <a
          href={downloadUrl}
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-500 text-white text-lg font-bold shadow-md hover:from-green-700 hover:to-blue-600 transition"
          download
        >
          Download File
        </a>
      ) : (
        <div className="text-red-600 font-semibold">
          Error: File path not set.
        </div>
      )}
    </Card>
  </div>
);

export default DownloadPage;

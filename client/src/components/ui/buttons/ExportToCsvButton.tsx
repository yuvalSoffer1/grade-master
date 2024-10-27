import { IconFileDownload } from "@tabler/icons-react";

interface IExportToCsvButtonProps {
  onExport: () => void;
}

const ExportToCsvButton = ({ onExport }: IExportToCsvButtonProps) => {
  return (
    <div className="relative text-center group ">
      <IconFileDownload
        width={50}
        height={30}
        className="text-green-700 cursor-pointer "
        onClick={onExport}
      />

      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Export To CSV
      </div>
    </div>
  );
};

export default ExportToCsvButton;

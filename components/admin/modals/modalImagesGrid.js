import { Modal as ModalFL } from "flowbite-react";
import { FiClipboard} from "react-icons/fi"

const ModalImagesGrid = ({ images, isOpen, toggleOpen, getUrlAndQuit }) => {
  return (
    <ModalFL show={isOpen} size="6xl" popup={true} onClose={toggleOpen}>
      <ModalFL.Header className="!text-xl !p-6 !pb-4">
        User's Images
      </ModalFL.Header>
      <ModalFL.Body className="text-white">
        <div className="flex flex-row flex-wrap gap-4 max-h-[600px] overflow-y-scroll">
        {images &&
          images.map((image, id) => (
            <div key={id} className="bg-gray-800 flex p-4 hover:bg-gray-900 relative group">
              <img src={image.url} alt={image.slug} className="max-h-[200px]"></img>
              <div className="flex flex-row gap-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-500 px-2 py-1 rounded-xl opacity-0 group-hover:opacity-50 group-hover:hover:opacity-100 z-100 hover:cursor-pointer" onClick={() => getUrlAndQuit(image.url)}>
                <div className="w-10">
                <FiClipboard className="w-full h-full" />
                </div>
                <span className="text-xl whitespace-nowrap self-center ">Copy URL</span>
              </div>
            </div>
          ))}
        </div>
      </ModalFL.Body>
    </ModalFL>
  );
};

export default ModalImagesGrid;

import LayerCard from "./ui/LayerCard";


export default function SideBarLayer() {
const layers = [
    {
      id: 1,
      title: "Portrait Main",
      subtitle: "Standard Layer",
      isActive: true,
      isVisible: true,
      isLocked: true,
      thumbnail: null // Ajoute tes URLs ici
    },
    {
      id: 2,
      title: "Effect Overlay",
      subtitle: "Overlay | 65%",
      isActive: false,
      isVisible: true,
      isLocked: true,
      thumbnail: null
    },
    {
      id: 3,
      title: "Sketch Ref",
      subtitle: "Background",
      isActive: false,
      isVisible: false,
      isLocked: true,
      thumbnail: null
    }
  ];

    return (
    <aside className="flex flex-col right-0  gap-4 absolute h-fill-available m-6 bg-[#171717] z-10">
      <div className="flex flex-col py-2 px-2 gap-1">
        {layers.map((layer) => (
          <LayerCard key={layer.id} {...layer} />
        ))}
      </div>
      
      {/* Espace vide pour remplir le reste de l'aside comme sur l'image */}
      <div className="flex-1 bg-[#991616]"></div>
    </aside>
    );
};

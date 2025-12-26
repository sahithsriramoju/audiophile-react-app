import type { ProductImage } from "../../types/Product";

export const ProductThumbnailImage = ({ images, name }: { images: ProductImage[]; name: string }) => {
    const thumbnailImage = images.find(image => image.imageType.toLowerCase() === 'thumbnail');
    if (!thumbnailImage) return null;

    const imageUrl = `https://res.cloudinary.com/dzvbnmljo/image/upload/${thumbnailImage.cloudinaryVersion}/${thumbnailImage.cloudinaryPublicId}.jpg`;
    const desktopUrl = `${imageUrl}?w=300&h=300&fit=crop`;
    const tabletUrl = `${imageUrl}?w=200&h=200&fit=crop`;
    const mobileUrl = `${imageUrl}?w=150&h=150&fit=crop`;
    return (
        <picture>
            <source media="(min-width: 1024px)" srcSet={desktopUrl} className="rounded-lg mb-8"  />
            <source media="(min-width: 768px)" srcSet={tabletUrl} className="rounded-lg mb-8" />
            <img src={mobileUrl} alt={name} className="rounded-lg mb-8" />
        </picture>
    );
}
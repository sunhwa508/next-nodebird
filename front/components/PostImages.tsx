import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useCallback } from 'react'

interface Props {
    images: any
}
const PostImages = ({ images }: Props) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true)
    }, []);

    if (images.length === 1) {
        return (
            <>
                <img role='presentation' style={{ maxHeight: "200px", objectFit: 'contain' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
            </>
        );
    }
    if (images.length === 2) {
        return (
            <div style={{ display: 'flex' }}>
                <img role='presentation' style={{ maxHeight: "200px", objectFit: 'contain', width: '50%' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <img role='presentation' style={{ maxHeight: "200px", objectFit: 'contain', width: '50%' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
            </div>
        );
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img role="presentation" style={{ maxHeight: "200px", objectFit: 'contain' }} src={images[0].src} alt={images[0].src} onClick={onZoom} />
                <div role="presentation" style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
                    onClick={onZoom}>
                    <PlusOutlined />
                    <br />
                    {images.length - 1} 개의 사진 더 보기
                </div>
            </div>
        </>
    )


}

export default PostImages
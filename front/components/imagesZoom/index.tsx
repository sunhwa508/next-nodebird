import { useState } from "react";
import Slick from "react-slick";
import shortid from "shortid";
import styled, { createGlobalStyle } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background-color: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
  & button {
    font-size: 30px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
    border: none;
  }
`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #ffffff;
`;

const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;
const Indicator = styled.div`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;
const Global = createGlobalStyle`
    .slick-slide{
        display: inline-block;
    }
`;
interface Props {
  images: [{ src: string }];
  onClose: () => void;
}
const ImagesZoom = ({ images, onClose }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세이미지</h1>
        <button onClick={onClose}>🙅🏻‍♀️</button>
      </Header>
      <SlickWrapper>
        <div>
          <Slick initialSlide={0} beforeChange={slide => setCurrentSlide(slide)} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
            {images.map(v => (
              <ImageWrapper key={shortid.generate()}>
                <img src={v.src} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};
export default ImagesZoom;

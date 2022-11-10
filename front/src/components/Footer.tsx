import { Footer as FooterBite } from 'flowbite-react'

export const Footer = () => (
  <FooterBite container={true}>
    <FooterBite.Copyright href="#" by="Flowbite™" year={2022} />
    <FooterBite.LinkGroup>
      <FooterBite.Link href="#">About</FooterBite.Link>
      <FooterBite.Link href="#">Privacy Policy</FooterBite.Link>
      <FooterBite.Link href="#">Licensing</FooterBite.Link>
      <FooterBite.Link href="#">Contact</FooterBite.Link>
    </FooterBite.LinkGroup>
  </FooterBite>
)

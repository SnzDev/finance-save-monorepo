import { Avatar, Dropdown, Navbar as Nav } from 'flowbite-react'

export const Navbar = () => (
  <Nav fluid={true} rounded={true}>
    <Nav.Brand href="https://flowbite.com/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Flowbite
      </span>
    </Nav.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded={true}
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Nav.Toggle />
    </div>
    <Nav.Collapse>
      <Nav.Link href="/navbars" active={true}>
        Home
      </Nav.Link>
      <Nav.Link href="/navbars">About</Nav.Link>
      <Nav.Link href="/navbars">Services</Nav.Link>
      <Nav.Link href="/navbars">Pricing</Nav.Link>
      <Nav.Link href="/navbars">Contact</Nav.Link>
    </Nav.Collapse>
  </Nav>
)

import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div
            className="
                py-1
                border-b-[1px]
            ">
            <Container>
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
                >
                    <Logo /> 
                    <Search />
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar
import { usePathname, useSearchParams } from "next/navigation"
import { BsSnow } from "react-icons/bs"
import { FaSkiing } from "react-icons/fa"
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { IoDiamond } from "react-icons/io5"
import { MdOutlineVilla } from "react-icons/md"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import CategoryBox from "../CategoryBox"
import Container from "../Container"

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: "This property is close to beach!",
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: "This property has windmills!",
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: "This property is modern!",
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: "This property is in countryside!",
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: "This property has a pool!",
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: "This property is on an island!",
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: "This property is close to a lake!",
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: "This property has skiing activities!",
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: "This property is in a castle!",
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: "This property has camping activites!",
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: "This property has snowy weather!",
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: "This property is in a cave!",
    },
    {
        label: 'Desert',
        icon: GiDesert,
        description: "This property is in the desert!",
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: "This property is in the barn!",
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: "This property is luxurious!",
    },
]

const Categories = () => {

    // only show the categories on the main page
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if(!isMainPage) {
        return null;
    }

    // is a main page
    const params = useSearchParams();
    const category = params.get('category');

  return (
    <Container>
        <div className="
            pt-2
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
        ">
            {categories.map((item) => {
                return (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                )
            })}
        </div>
    </Container>
  )
}

export default Categories
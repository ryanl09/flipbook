import Image from "next/image";

const Logo = (): JSX.Element => {
    return (
        <div className="font-bold text-2xl flex items-center gap-2">
          <Image src="/fb-transparent-sized.png" width={30} height={30} alt="" />
          <span>
            Flip
            <span className="text-primary">Book</span>
          </span>
        </div>
    )    
}

export default Logo;
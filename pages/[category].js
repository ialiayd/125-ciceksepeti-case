import { useRouter } from 'next/router'
import Home from "./index"

export default function CatPage() {

    const router = useRouter();
    const { category } = router.query;


    return (
        <Home category={category} />
    )

}

//TODO: State kullanmayı dene. Selected category'i burada set edip catlistteen çek
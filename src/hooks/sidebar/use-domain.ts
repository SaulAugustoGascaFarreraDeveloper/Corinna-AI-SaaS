import { AddDomainSchema, AddDomainSchemaProps } from "@/schemas/settings.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {UploadClient} from "@uploadcare/upload-client"
import { usePathname } from "next/navigation"
import { FieldValues, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "../use-toast"
import { onIntegrateDomain } from "@/actions/settings"



const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})


export const useDomain = () => {

    const {register,formState:{errors},reset,handleSubmit} = useForm<FieldValues>({
        resolver: zodResolver(AddDomainSchema)
    })

    const pathname = usePathname()

    const {toast} = useToast()

    const [loading,setLoading] = useState<boolean>(false)
    const [isDomain,setIsDomain] = useState<string | undefined>(undefined)

    const router = useRouter()

    useEffect(() => {

        setIsDomain(pathname.split('/').pop())

        

    },[pathname])

    const onAddDomain = handleSubmit(async (values: FieldValues) => {

        try{

            setLoading(true)

            const uploaded = await upload.uploadFile(values.image[0])

            const domain = await onIntegrateDomain(values.name,uploaded.uuid)

            if(domain)
            {
                reset()

                toast({
                    title: domain.status == 200 ? 'Success' : 'Error',
                    description: domain.message
                })
            }

            router.refresh()

        }catch(error){

            console.log("On Add Domain Error --> ",error)

        }finally{
            setLoading(false)
        }


        
    })


    return {loading,register,onAddDomain,isDomain,errors}


}
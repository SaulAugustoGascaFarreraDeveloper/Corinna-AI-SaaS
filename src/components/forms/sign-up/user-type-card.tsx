import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React, { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import {User,GraduationCap} from "lucide-react"
import { Input } from '@/components/ui/input'

type UserTypeCardProps = {
    value: string
    title: string
    text:string
    register: UseFormRegister<FieldValues>
    userType: 'owner' | 'student'
    setUserType: Dispatch<SetStateAction<'owner' | 'student'>>
}

const UserTypeCard = ({value,title,text,register,userType,setUserType} : UserTypeCardProps) => {
  return (
    <Label htmlFor={value}>
        <Card
            className={cn("w-full cursor-pointer",
                userType === value && "border-orange-400"
            )}
        >
            <CardContent className='flex justify-between p-2'>
                    <div className="flex items-center gap-3">
                        <Card className={cn('flex justify-center p-3',
                            userType === value && "border-orange-400"
                        )}>
                            {value == 'owner' ? <User 
                                size={30}
                                className={cn(userType === value ? "text-orange-400" : "text-gray-400")}
                            /> : <GraduationCap 
                            size={30}
                            className={cn(userType === value ? "text-orange-400" : "text-gray-400")}
                        />}
                        </Card>
                        <div>
                            <CardDescription className='font-bold text-black'>{title}</CardDescription>
                            <CardDescription className='font-light text-slate-800'>{text}</CardDescription>
                        </div>
                    </div>
                    <div>
                        <div className={cn("w-4 h-4 rounded-full",userType === value ? "bg-orange-400" : "bg-transparent")}>
                            <Input 
                                type='radio'
                                className='hidden'
                                value={value}
                                id={value}
                                {...register('type',{
                                    onChange: (event) => setUserType(event.target.value)
                                })}
                                
                            />
                        </div>
                    </div>
            </CardContent>

        </Card>
    </Label>
  )
}

export default UserTypeCard
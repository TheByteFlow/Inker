import { useTheme } from "../common/theme-provider"
import LightLogo from '@/assets/Logo Light.svg'
import DarkLogo from '@/assets/Logo Dark.svg'

export const SideLayout = () => {
    const { theme } = useTheme()
    return (
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
            <div className='absolute inset-0 bg-zinc-900' />
            <div className='relative z-20 flex items-center text-lg font-medium'>
                <img
                    src={theme == 'light' ? LightLogo : DarkLogo}
                    className='mr-2 h-20 w-20'
                    alt='Inker'
                />
            </div>
        </div>
    )
}

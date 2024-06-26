

const ExpiredLink = () => {

return (
        <>
            <div className='flex flex-col items-center text-center w-full px-2 mx-auto loader'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="crimson" className="mb-4 sm:w-24 sm:h-24 md:w-28 md:h-28  tablet:w-28 tablet:h-28 mini:w-32 mini:h-32 laptop:w-32 laptop:h-32 super:w-32 super:h-32" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                </svg>

                <p className='text-sm text-my-primary font-Montserrat'> Sorry. The link is invalid or may have expired. </p>

            </div>
        </>
)
}

export default ExpiredLink
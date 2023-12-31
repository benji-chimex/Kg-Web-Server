import { ethers } from "ethers"
import { EMPIRE_TOKEN, getProvider, getSigner } from "./config.js"

import Empire_ABI from "./EMPIRE.json" assert {type:"json"}

export const balance = async (account) => {
    const ABI = JSON.stringify(Empire_ABI)
    const empire = new ethers.Contract(
        EMPIRE_TOKEN,
        JSON.parse(ABI).output.abi,
        getProvider()
    )
    console.log(ethers.formatEther(await empire.balanceOf(account)))

    const balanceOf = await empire.balanceOf(account)

    return ethers.formatEther(balanceOf)
}

export const transfer = async (from, to, amount) => {
    const ABI = JSON.stringify(Empire_ABI)
    const empire = new ethers.Contract(
        EMPIRE_TOKEN,
        JSON.parse(ABI).output.abi,
        getSigner()
    )
    console.log(ethers.formatEther(await empire.totalSupply()))

    await empire.transferFrom(
        from,
        to,
        ethers.parseEther(amount)
    )

    empire.on("Transfer", (from, to, amount, e) => {
        console.log(`Transfer of ${ethers.formatEther(amount)} from ${from} to ${to}.`)

        return { from, to, amount }
    })
}
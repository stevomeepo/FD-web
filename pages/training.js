import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import Head from 'next/head';

export default function Training() {
    return (
        <div className="items-center h-screen">
            <Head>
                <title>Training - Forensic Drone</title>
            </Head>
            <h1 className="text-center">
                Cell Phone Class
            </h1>
            <p className="text-center">
                ​Our 4-day (32-hour) Cell Phone Class is the most comprehensive forensic examination course available. 
                We equip criminal analysts, police officers, detectives, and lawyers with the necessary skills for cell phone analysis using specialized software. 
                At Forensic Technologies, we're committed to enhancing your investigations through the latest techniques and the best instruction.
            </p>
        </div>
    )
}
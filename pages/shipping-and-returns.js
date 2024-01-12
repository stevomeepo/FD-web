import Head from 'next/head'

export default function ShippingAndReturns() {
    return (
        <div className="flex flex-col items-center justify-center prose prose-lg mx-auto p-4 max-w-2xl text-center">
            <Head>
            <title>Shipping & Returns - Forensic Drone</title>
            </Head>
            <h1 className="text-4xl font-bold pb-7">Shipping Policy</h1>
            <p>Thank you for visiting and shopping at ForensicDrone. Following are the terms and conditions that constitute our Shipping Policy.</p>
            <h1 className="font-bold pt-7">Shipment Rate Calculations</h1>
            <p>ForensicDrone uses rate by weight system to calculate how much shipping would cost to ship to your area.
                After check out the website's system calculates your order weight.</p>
            <h1 className="font-bold pt-7">Shipment Rate Calculations Continue</h1>
            <p>There are three section of calculated shipment. First is the standard shipment of orders that weight less than 20lbs. 
                Each will vary of different price depending of the weight of the order - no more than $20. 
                Second is the semi heavy shipment for orders that weight more than 20lbs and less than 50. 
                Each will vary of different price depending of the weight of the order - no more than $50. 
                The last one is the heavy shipment for orders that weight more than 50lbs. Price will vary after that.</p>
            <h1 className="font-bold pt-7">Shipment Processing Time</h1>
            <p>All orders are processed within 2-5 business days. 
                Orders are not shipped or delivered on weekends or holidays. 
                If we are experiencing a high volume of orders, shipments may be delayed by a few days. 
                Please allow additional days in transit for delivery. 
                If there will be a significant delay in shipment of your order, we will contact you via email.</p>
            <h1 className="font-bold pt-7">Shipment to P.O. Boxes or APO/FPO Addresses</h1>
            <p>ForensicDrone ships to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses. </p>
            <h1 className="font-bold pt-7">Shipment confirmation & Order tracking</h1>
            <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). 
                The tracking number will be active within 24 hours.</p>
            <h1 className="font-bold pt-7">Customs, Duties and Taxes</h1>
            <p>ForensicDrone is not responsible for any customs and taxes applied to your order. 
                All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
            <h1 className="font-bold pt-7">Damages</h1>
            <p>ForensicDrone is not liable for any products damaged or lost during shipping. 
                If you received your order damaged, please contact the shipment carrier to file a claim. 
                Please save all packaging materials and damaged goods before filing a claim.</p>
            <h1 className="font-bold pt-7">International Shipping Policy</h1>
            <p>We currently do not ship outside the U.S</p>
            <h1 className="text-4xl font-bold pt-20 pb-7">Return & Refund Policy</h1>
            <h1 className="font-bold pt-7">Return & Refund Policy</h1>
            <p>Thanks for shopping at ForensicDrone. If you are not entirely satisfied with your purchase, we're here to help.</p>
            <h1 className="font-bold pt-7">Returns</h1>
            <p>You have 30 days to return an item from the date you received it. 
                To be eligible for a return, your item must be unused and in the same condition that you received it. 
                Your item must be in the original packaging. Your item needs to have the proof of purchase.</p>
            <h1 className="font-bold pt-7">Refunds</h1>
            <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. 
                We will immediately notify you on the status of your refund after inspecting the item. 
                If your return is approved, we will initiate a refund to your credit card (or original method of payment). 
                You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
        </div>
  )
}
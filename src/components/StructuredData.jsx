const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KisanVikas",
    "description": "Smart Farming Solutions and Agricultural Technology Platform",
    "url": "https://kisanvikas.in",
    "sameAs": [
      "https://facebook.com/kisanvikas",
      "https://twitter.com/kisanvikas",
      "https://linkedin.com/company/kisanvikas"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "HIG-1 NEHRU ENCLAVE, SHAMSHABAD ROAD",
      "addressLocality": "AGRA",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "282001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7467885047",
      "contactType": "customer service",
      "email": "support@kisanvikas.in"
    },
    "offers": {
      "@type": "AggregateOffer",
      "name": "Agricultural Services",
      "offers": [
        {
          "@type": "Offer",
          "name": "Farm Equipment Store",
          "description": "Buy and rent modern farming equipment"
        },
        {
          "@type": "Offer",
          "name": "Crop Advisory",
          "description": "Expert agricultural advice and support"
        }
      ]
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export default StructuredData; 
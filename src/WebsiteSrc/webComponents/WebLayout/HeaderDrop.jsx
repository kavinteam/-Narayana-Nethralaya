// import React from "react";
// import { MegaMenu } from "primereact/megamenu";
// import { Ripple } from "primereact/ripple";
// import { Button } from "primereact/button";

// const HeaderDrop = () => {
//   const itemRenderer = (item, options) => {
//     if (item.root) {
//       return (
//         <a
//           className="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase p-ripple hover:surface-ground"
//           style={{ borderRadius: "2rem" }}
//         >
//           <span className={item.icon} />
//           <span className="ml-2">{item.label}</span>
//           <Ripple />
//         </a>
//       );
//     } else if (!item.image) {
//       return (
//         <a className="flex align-items-center p-3 c ursor-pointer mb-2 gap-2 ">
//           <span className="inline-flex align-items-center justify-content-center border-circle bg-primary w-3rem h-3rem">
//             <i className={`${item.icon} text-lg`}></i>
//           </span>
//           <span className="inline-flex flex-column gap-1">
//             <span className="font-medium text-lg text-900">{item.label}</span>
//             <span className="white-space-nowrap">{item.subtext}</span>
//           </span>
//         </a>
//       );
//     } else {
//       return (
//         <div className="flex flex-column align-items-start gap-3">
//           <img alt="megamenu-demo" src={item.image} className="w-full" />
//           <span>{item.subtext}</span>
//           <Button
//             className="p-button p-component p-button-outlined"
//             label={item.label}
//           />
//         </div>
//       );
//     }
//   };

//   const items = [
//     {
//       label: "Company",
//       root: true,
//       template: itemRenderer,
//       items: [
//         [
//           {
//             items: [
//               {
//                 label: "Features",
//                 icon: "pi pi-list",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Customers",
//                 icon: "pi pi-users",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Case Studies",
//                 icon: "pi pi-file",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//             ],
//           },
//         ],
//         [
//           {
//             items: [
//               {
//                 label: "Solutions",
//                 icon: "pi pi-shield",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Faq",
//                 icon: "pi pi-question",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Library",
//                 icon: "pi pi-search",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//             ],
//           },
//         ],
//         [
//           {
//             items: [
//               {
//                 label: "Community",
//                 icon: "pi pi-comments",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Rewards",
//                 icon: "pi pi-star",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//               {
//                 label: "Investors",
//                 icon: "pi pi-globe",
//                 subtext: "Subtext of item",
//                 template: itemRenderer,
//               },
//             ],
//           },
//         ],
//         [
//           {
//             items: [
//               {
//                 image:
//                   "https://primefaces.org/cdn/primereact/images/uikit/uikit-system.png",
//                 label: "GET STARTED",
//                 subtext: "Build spectacular apps in no time.",
//                 template: itemRenderer,
//               },
//             ],
//           },
//         ],
//       ],
//     },
//   ];
//   return (
//     <div>
//       <MegaMenu
//         model={items}
//         orientation="horizontal"
//         barekpoint="960px"
//         className="p-3 surface-0 shadow-2"
//         style={{ borderRadius: "3rem" }}
//       />
//     </div>
//   );
// };

// export default HeaderDrop;
import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { Ripple } from "primereact/ripple";
import { Button } from "primereact/button";
import './Header.css';
// import './HeaderDrop.css';
const HeaderDrop = () => {
  const itemRenderer = (item, options) => {
    if (item.root) {
      return (
        <a
          className="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase p-ripple header-menu-item"
        >
          <span className={item.icon} />
          <span className="ml-2">{item.label}</span>
          <Ripple />
        </a>
      );
    } else if (!item.image) {
      return (
        <a className="flex align-items-center p-3 cursor-pointer mb-2 gap-2 dropdown-item">
          <span className="inline-flex align-items-center justify-content-center border-circle icon-wrapper">
            <i className={`${item.icon} text-lg`}></i>
          </span>
          <span className="inline-flex flex-column gap-1">
            <span className="font-medium text-lg text-900">{item.label}</span>
            <span className="white-space-nowrap">{item.subtext}</span>
          </span>
        </a>
      );
    } else {
      return (
        <div className="flex flex-column align-items-start gap-3">
          <img alt="megamenu-demo" src={item.image} className="w-full" />
          <span>{item.subtext}</span>
          <Button
            className="p-button p-component p-button-outlined"
            label={item.label}
          />
        </div>
      );
    }
  };

  const items = [
    {
      label: "Our Specialties",
      root: true,
      template: itemRenderer,
      items: [
        [
          {
            items: [
              {
                label: "Cataract",
                icon: "pi pi-eye",
                subtext: "Vision restoration surgery",
                template: itemRenderer,
              },
              {
                label: "Cornea",
                icon: "pi pi-eye",
                subtext: "Corneal treatment",
                template: itemRenderer,
              },
              {
                label: "Refractive Surgery",
                icon: "pi pi-eye",
                subtext: "Corrective eye surgery",
                template: itemRenderer,
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                label: "Vitreoretinal Services",
                icon: "pi pi-eye",
                subtext: "Retinal surgery and care",
                template: itemRenderer,
              },
              {
                label: "Glaucoma",
                icon: "pi pi-eye",
                subtext: "Glaucoma treatment",
                template: itemRenderer,
              },
              {
                label: "Pediatric",
                icon: "pi pi-smile",
                subtext: "Children's eye care",
                template: itemRenderer,
              },
            ],
          },
        ],
        [
          {
            items: [
              {
                label: "Uveitis",
                icon: "pi pi-eye",
                subtext: "Inflammation of the eye",
                template: itemRenderer,
              },
              {
                label: "Keratoconus",
                icon: "pi pi-eye",
                subtext: "Corneal disorder",
                template: itemRenderer,
              },
              {
                label: "Kidrop",
                icon: "pi pi-baby",
                subtext: "Pediatric eye care",
                template: itemRenderer,
              },
            ],
          },
        ],
      ],
    },
  ];

  return (
    <div className="header-container">
      <MegaMenu
        model={items}
        orientation="horizontal"
        breakpoint="960px"
        className="p-3 surface-0 shadow-2 custom-megamenu"
        style={{ borderRadius: "3rem" }}
      />
    </div>
  );
};

export default HeaderDrop;

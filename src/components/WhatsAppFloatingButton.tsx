import React from 'react';

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-3.5 items-end">
      {/* Official LinkedIn Floating Button */}
      <a
        href="https://www.linkedin.com/company/131874101/admin/dashboard/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#0A66C2] text-white rounded-full shadow-[0_4px_20px_rgba(10,102,194,0.35)] hover:shadow-[0_6px_25px_rgba(10,102,194,0.5)] border border-[#0A66C2]/20 hover:scale-[1.08] active:scale-95 transition-all duration-300 group cursor-none"
        aria-label="Visit our LinkedIn company page"
      >
        {/* Modern styled LinkedIn 'In' SVG */}
        <svg
          className="w-5.5 h-5.5 text-white fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* Official WhatsApp Floating Button */}
      <a
        href="https://wa.me/918076664199?text=Hi!%20I'm%20interested%20in%20your%20intelligent%20software%20and%20automation%20solutions.%20Could%20we%20connect%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.5)] border border-[#25D366]/20 hover:scale-[1.08] active:scale-95 transition-all duration-300 group cursor-none relative"
        aria-label="Chat with ShelSun Tech on WhatsApp"
      >
        {/* Pulse beacon glow effect for the primary chat line */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/25 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Icon with clean paths */}
        <svg
          className="w-5.5 h-5.5 text-white fill-current group-hover:scale-110 transition-transform duration-300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 0C5.39 0 0 5.39 0 12.03c0 2.115.553 4.184 1.597 6.012L0 24l6.135-1.609a12.012 12.012 0 0 0 5.891 1.54C18.66 23.931 24 18.54 24 11.9a11.9 11.9 0 0 0-11.969-11.9zm-.031 21.921c-2.022 0-4.01-.54-5.753-1.562l-.41-.244-3.666.963.979-3.573-.269-.427a9.851 9.851 0 0 1-1.503-5.048c.003-5.432 4.425-9.854 9.863-9.854 2.632 0 5.109 1.025 6.969 2.887a9.81 9.81 0 0 1 2.884 6.974c-.004 5.434-4.426 9.857-9.864 9.857zm5.405-7.38c-.296-.148-1.751-.864-2.023-.963-.27-.1-.468-.148-.664.148-.197.296-.762.963-.935 1.16-.173.197-.346.223-.642.075-.296-.148-1.25-.46-2.383-1.47-1.127-1.004-1.888-2.245-2.11-2.616-.222-.37-.024-.57.161-.754.166-.165.37-.432.555-.648.185-.216.247-.37.37-.617.123-.247.062-.463-.03-.66-.093-.198-.664-1.602-.911-2.195-.24-.577-.484-.498-.664-.508l-.567-.01c-.197 0-.518.074-.79.37-.27.296-1.037 1.012-1.037 2.47 0 1.456 1.062 2.864 1.21 3.061.148.198 2.09 3.193 5.064 4.477.708.305 1.26.488 1.691.625.712.226 1.36.194 1.872.118.571-.085 1.751-.716 1.999-1.407.247-.691.247-1.284.173-1.407-.074-.123-.272-.197-.568-.346z" />
        </svg>
      </a>
    </div>
  );
}

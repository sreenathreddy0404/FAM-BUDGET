import React from 'react';

const ColorPalette = () => {
  // Mapping of the custom tokens defined in your @theme block
  const themeColors = [
    { name: "Background", class: "bg-background", textClass: "text-foreground", code: "hsl(40 20% 98%)" },
    { name: "Foreground", class: "bg-foreground", textClass: "text-background", code: "hsl(220 25% 15%)" },
    { name: "Card", class: "bg-card", textClass: "text-card-foreground", code: "hsl(0 0% 100%)" },
    { name: "Primary", class: "bg-primary", textClass: "text-primary-foreground", code: "hsl(158 64% 40%)" },
    { name: "Secondary", class: "bg-secondary", textClass: "text-secondary-foreground", code: "hsl(35 90% 55%)" },
    { name: "Accent", class: "bg-accent", textClass: "text-accent-foreground", code: "hsl(158 40% 95%)" },
    { name: "Destructive", class: "bg-destructive", textClass: "text-destructive-foreground", code: "hsl(0 72% 55%)" },
    { name: "Success", class: "bg-success", textClass: "text-white", code: "hsl(158 64% 40%)" },
    { name: "Warning", class: "bg-warning", textClass: "text-white", code: "hsl(35 90% 55%)" },
    { name: "Info", class: "bg-info", textClass: "text-white", code: "hsl(200 80% 50%)" },
  ];

  const sidebarColors = [
    { name: "Sidebar Background", class: "bg-sidebar-background", text: "text-sidebar-foreground", code: "0 0% 100%" },
    { name: "Sidebar Foreground", class: "bg-sidebar-foreground", text: "text-sidebar-background", code: "220 25% 15%" },
    { name: "Sidebar Primary", class: "bg-sidebar-primary", text: "text-sidebar-primary-foreground", code: "158 64% 40%" },
    { name: "Sidebar Accent", class: "bg-sidebar-accent", text: "text-sidebar-accent-foreground", code: "158 40% 95%" },
    { name: "Sidebar Border", class: "bg-sidebar-border", text: "text-sidebar-foreground", code: "40 15% 90%" },
  ];

  const gradients = [
    { name: "Gradient Primary", class: "bg-gradient-primary", code: "Linear (135deg)" },
    { name: "Gradient Warm", class: "bg-gradient-warm", code: "Linear (135deg)" },
  ];

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">System Theme Palette</h1>
        <p className="text-foreground/60">Generated from Tailwind v4 @theme configuration</p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-foreground border-b border-border pb-2">Core Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {themeColors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div className={`${color.class} h-24 w-full rounded-xl shadow-md border border-border flex items-center justify-center`}>
                <span className={`${color.textClass} font-medium text-xs opacity-0 hover:opacity-100 transition-opacity`}>
                  Preview
                </span>
              </div>
              <div>
                <p className="font-bold text-foreground">{color.name}</p>
                <p className="text-xs font-mono text-foreground/50 uppercase">{color.code}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6 text-foreground border-b border-border pb-2">Custom Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gradients.map((grad) => (
            <div key={grad.name} className="flex flex-col gap-2">
              <div className={`${grad.class} h-32 w-full rounded-xl shadow-lg border border-border`} />
              <div>
                <p className="font-bold text-foreground">{grad.name}</p>
                <p className="text-xs font-mono text-foreground/50 uppercase">{grad.code}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar Visualization Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Sidebar Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sidebarColors.map((color) => (
            <div key={color.name} className="flex items-center gap-4 p-4 border border-sidebar-border rounded-xl bg-card shadow-sm">
              <div className={`h-12 w-12 rounded-lg border border-sidebar-border ${color.class}`} />
              <div>
                <p className="font-medium text-sm">{color.name}</p>
                <code className="text-xs opacity-60">{color.code}</code>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Component Preview */}
        <div className="max-w-xs border border-sidebar-border rounded-xl overflow-hidden shadow-xl">
          <div className="bg-sidebar-background p-4 min-h-[300px] flex flex-col gap-2">
            <div className="h-8 w-3/4 bg-sidebar-accent rounded-md flex items-center px-3 mb-4">
               <span className="text-xs font-bold text-sidebar-accent-foreground">Sidebar Header</span>
            </div>
            
            <div className="space-y-1">
              <div className="h-10 bg-sidebar-primary text-sidebar-primary-foreground rounded-md flex items-center px-3 text-sm font-medium">
                Active Item
              </div>
              <div className="h-10 hover:bg-sidebar-accent text-sidebar-foreground rounded-md flex items-center px-3 text-sm transition-colors cursor-pointer">
                Nav Item 1
              </div>
              <div className="h-10 hover:bg-sidebar-accent text-sidebar-foreground rounded-md flex items-center px-3 text-sm transition-colors cursor-pointer">
                Nav Item 2
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-sidebar-border">
               <div className="flex items-center gap-2 px-2">
                  <div className="h-8 w-8 rounded-full bg-sidebar-ring" />
                  <div className="text-xs">
                    <p className="font-bold">User Profile</p>
                    <p className="opacity-60">Admin Role</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="mt-20 pt-8 border-t border-border">
        <div className="flex gap-4">
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl shadow-sm">Primary Button</div>
            <div className="px-4 py-2 border border-input bg-card text-foreground rounded-xl shadow-sm">Secondary Action</div>
        </div>
      </footer>
    </div>
  );
};

export default ColorPalette;
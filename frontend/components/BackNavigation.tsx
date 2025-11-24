import { Button } from '@/components/hoc';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface BackNavigationProps {
  href?: string;
  label?: string;
  title?: ReactNode;
}

export default function BackNavigation({ href = '/', label = 'Back to Home', title }: BackNavigationProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Back button on the left */}
        <div>
          <Button href={href} variant="ghost" size="sm" className="gap-2 py-1 px-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        </div>

        {/* Title centered */}
        <div className="text-center">
          {title}
        </div>

        {/* Empty div for symmetry */}
        <div className="w-[100px]" />
      </div>
    </div>
  );
}

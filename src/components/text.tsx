import { CSSProperties } from 'react'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
  html?: string
}

const variantMap: { [key in Variant]: string } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span'
}

const Text: React.FC<Props> = ({
  variant = 'h5',
  className,
  style,
  children,
  html
}) => {
  const Tag = variantMap[variant] as keyof JSX.IntrinsicElements
  const classNames = [className]

  if (variant === 'h1' || variant === 'h2') {
    classNames.push('nunito-regular')
  } else if (variant === 'p') {
    classNames.push('text-onSurface text-sm leading-7')
  }

  return (
    <Tag className={classNames.join(' ')} style={style}>
      {children || html}
    </Tag>
  )
}

export default Text

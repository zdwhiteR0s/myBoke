import { Highlight } from 'prism-react-renderer';

// 定义一个内置的暗色主题
const darkTheme = {
  plain: {
    color: '#e6e6e6',
    backgroundColor: '#1e1e1e'
  },
  styles: [
    {
      types: ['comment'],
      style: {
        color: '#6a9955',
        fontStyle: 'italic'
      }
    },
    {
      types: ['keyword', 'selector', 'changed'],
      style: {
        color: '#569cd6'
      }
    },
    {
      types: ['constant', 'number', 'builtin'],
      style: {
        color: '#b5cea8'
      }
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#ce9178'
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: '#d4d4d4'
      }
    },
    {
      types: ['function'],
      style: {
        color: '#dcdcaa'
      }
    },
    {
      types: ['class-name', 'tag'],
      style: {
        color: '#4ec9b0'
      }
    },
    {
      types: ['operator'],
      style: {
        color: '#d4d4d4'
      }
    },
    {
      types: ['variable'],
      style: {
        color: '#9cdcfe'
      }
    }
  ]
};

const CodeBlock = ({ language, children }) => {
  return (
    <div className="rounded-lg overflow-hidden my-4">
      <div className="bg-gray-800 text-gray-200 px-4 py-1 text-sm">
        {language}
      </div>
      <Highlight
        theme={darkTheme}
        code={children.trim()}
        language={language || 'javascript'}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '1rem', margin: 0, fontSize: '0.9rem' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="text-gray-500 select-none mr-4">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock; 
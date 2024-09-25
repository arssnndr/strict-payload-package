import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts', // Masukkan file TypeScript utama
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs' // CommonJS untuk Node.js
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm' // ES Module untuk modern bundlers
        }
    ],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true
        })
    ]
};

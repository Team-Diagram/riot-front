import matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, it } from 'vitest'

global.describe = describe
global.it = it
global.expect = expect

expect.extend(matchers)
